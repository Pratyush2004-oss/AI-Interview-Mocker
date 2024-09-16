'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GiminiAIModal';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import {v4 as uuidv4} from 'uuid'
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

const AddNewInterview = () => {
    const {user} = useUser();
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState();
    const [jobdescription, setJobdescription] = useState();
    const [jobExperience, setJobexperience] = useState();
    const [loading,setLoading] = useState(false);
    const [JsonResp,setJsonResp]= useState([]);
    const router = useRouter();

    const onSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        const inputPrompt = `Job position: ${jobPosition}, Job Description: ${jobdescription} Years of Experience : ${jobExperience}. Depends on Job Position, Job Description and years of Experience give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} Interview questions along with Answer in JSON format. Give Questions and answers in JSON form only with question and answer field, No additional Note`
        const result = await chatSession.sendMessage(inputPrompt)
        const MockJsonResp = (result.response.text()).replace('```json','').replace('```','')
        if(MockJsonResp){
            setJsonResp(MockJsonResp)

            // Saving Data in DataBase
            const resp = await db.insert(MockInterview).values({
                mockId: uuidv4(),
                jsonMockResp: MockJsonResp,
                jobPosition: jobPosition,
                jobDesc: jobdescription,
                jobExperience: jobExperience,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-yyyy')
            }).returning({mockId:MockInterview.mockId})

            console.log("Inserted ID: ", resp)
            if(resp){
                setOpenDialog(false)
                router.push('/dashboard/interview/'+resp[0]?.mockId)
            }
        }
        else{
            console.log("ERROR")
        }
        setLoading(false)
    }

    return (
        <div>
            <div
                onClick={() => setOpenDialog(true)}
                className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'>
                <h2 className='font-bold text-center'>+ Add New</h2>

            </div>
            <Dialog open={openDialog}>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle><h2 className='font-bold text-2xl'>Tell us more about your Job Interview</h2></DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2>Add details about your job position/role, Job description and years of experience</h2>

                                    <div className='mt-7 my-2 text-black'>
                                        <label>Job Position/ Role name</label>
                                        <Input
                                            placeholder='Ex. : Full Stack Developer, Software designer, etc' required
                                            onChange={(event) => setJobPosition(event.target.value)}
                                        />
                                    </div>
                                    <div className='my-3 text-black'>
                                        <label>Job description/ Tech Stack (in short)</label>
                                        <Textarea placeholder='Ex. : React, Angular, NodeJS, MySql, etc' required
                                            onChange={(event) => setJobdescription(event.target.value)}
                                        />
                                    </div>
                                    <div className=' my-3 text-black'>
                                        <label>Years of Experience</label>
                                        <Input placeholder='Ex. : 5' type='number' max='50' required
                                            onChange={(event) => setJobexperience(event.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='justify-end flex gap-3 mt-4'>
                                    <Button type='button' variant='destructive' onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button disabled={loading || !jobExperience || !jobdescription || !jobPosition } type='submit'>{loading && <span className='loading loading-ball'></span>}
                                    {!loading && 'Start Interview'}</Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewInterview