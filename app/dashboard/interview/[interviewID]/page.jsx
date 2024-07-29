'use client'
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam';

const Interview = ({ params }) => {
    const { user } = useUser();
    const [InterviewData, setInterviewData] = useState();
    const [webcamEnable, setWencamEnable] = useState(false);
    useEffect(() => {
        GetInterviewDetails();
    }, []);

    const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview)
            .where(eq(MockInterview.mockId, params.interviewID))

        setInterviewData(result[0])
    }

    return (
        <div className='my-6 '>
            <h2 className='font-bold text-2xl'>Let's Get Started</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {InterviewData &&
                    <div className='flex flex-col my-5 gap-5'>
                        <div className='flex flex-col p-5 rounded-lg border gap-5'>
                            <h2 className='text-lg'><strong>Job Role/ Job Position : </strong> {InterviewData.jobPosition}</h2>
                            <h2 className='text-lg'><strong>Job Description/ Tech Stack : </strong> {InterviewData.jobDesc}</h2>
                            <h2 className='text-lg'><strong>Years of Experience : </strong> {InterviewData.jobExperience} {InterviewData.jobExperience == 1 ? 'year' : 'years'}</h2>
                        </div>
                        <div className='p-5 rounded-lg border-yellow-300 bg-yellow-100'>
                            <h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb /><strong>Information</strong></h2>
                            <h2 className='text-justify mt-3 text-yellow-700 text-sm'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                        </div>
                    </div>
                }
                {/* Webcam */}
                <div>
                    {webcamEnable && <Webcam
                        onUserMedia={() => setWencamEnable(true)}
                        onUserMediaError={() => setWencamEnable(false)}
                        mirrored={true}
                        style={{
                            height: 300,
                            width: 600,
                            margin: 20
                        }} />}
                    {!webcamEnable &&
                        <div>
                            <WebcamIcon className='w-full h-72 my-7 p-20 bg-secondary rounded-lg border ' />
                            <Button variant='outline' className='w-full' onClick={() => setWencamEnable(true)}>Enable Webcam and Microphone</Button>
                        </div>
                    }
                </div>
            </div>
            <div className='flex justify-end items-end my-4'>
                <Link href={`/dashboard/interview/${params.interviewID}/start`}>
                    <Button>Start Interview</Button>
                </Link>
            </div>
        </div>
    )
}

export default Interview