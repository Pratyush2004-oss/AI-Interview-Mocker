'use client'

import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'


const Feedback = ({ params }) => {
    const [FeedbackList, setFeedBacklist] = useState([]);
    const router = useRouter();
    const [overallRating, setoverallRating] = useState(0)

    useEffect(() => {
        GetFeedback();
    }, [])
    const GetFeedback = async () => {
        const result = await db.select().from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, params.interviewID))
            .orderBy(UserAnswer.id);

        setFeedBacklist(result)
    }
    return (
        <div className='p-10'>
            {FeedbackList.length == 0 && <h2 className='text-error text-xl font-semibold'>You have not submitted your interview. Please Complete the interview and then go for feedback</h2>}
            {FeedbackList.length > 0 &&
                <div>
                    <h2 className='text-2xl font-bold text-success'>Congratulation</h2>
                    <h2 className='font-bold text-2xl'>Here is your Interview Feedback</h2>
                    <h2 className='text-primary text-lg my-3'>Your overall Interview rating <strong>7/10</strong> </h2>

                    <h2 className='text-sm text-gray-500'>Find below interview Question with correct answer, your answer and feedback for imporvement </h2>
                    {

                        FeedbackList.map((item, idx) => (
                            <Collapsible key={idx} className='mt-10 border-4 rounded-lg'>
                                <CollapsibleTrigger className='p-2 w-full bg-secondary flex gap-3 rounded-lg my-2 text-justify'>{item.question} <ChevronsUpDown className='h-5 w-5' /> </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <div className='flex flex-col gap-2'>
                                        <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating : </strong> {item.rating}</h2>
                                        <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900 text-justify'><strong>Your Answer : </strong> {item.userAnswer}</h2>
                                        <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900 text-justify'><strong>Correct Answer : </strong> {item.correctAnswer}</h2>
                                        <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-900 text-justify'><strong>Feedback : </strong> {item.feedback}</h2>
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        ))}
                </div>
            }
            <Button variant='link' onClick={() => router.replace('/dashboard')}>Go Home</Button>
        </div>
    )
}

export default Feedback