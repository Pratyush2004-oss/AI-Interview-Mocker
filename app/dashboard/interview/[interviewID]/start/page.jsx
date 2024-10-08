'use client'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionSection from './_components/QuestionSection';
import RecordAnswers from './_components/RecordAnswers';
import { Button } from '@/components/ui/button';
import { ArrowLeftSquare, ArrowRightSquare } from 'lucide-react';
import Link from 'next/link';

const StartInterview = ({ params }) => {

    const [InterviewData, setInterviewData] = useState();
    const [mockInterviewQuestions, setMockinterviewQuestions] = useState();
    const [activequestionIndex, setActiveQuestionIndex] = useState(0);

    useEffect(() => {
        GetInterviewDetails();
    }, [])
    const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview)
            .where(eq(MockInterview.mockId, params.interviewID))

        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        setMockinterviewQuestions(jsonMockResp);
        setInterviewData(result[0]);
        console.log(result[0])
    }
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {/* Questions */}
                <QuestionSection
                    mockInterviewQuestions={mockInterviewQuestions}
                    activequestionIndex={activequestionIndex}
                />

                {/* Video/ audio recording */}
                <div>
                    <RecordAnswers
                        mockInterviewQuestions={mockInterviewQuestions}
                        activequestionIndex={activequestionIndex}
                        InterviewData={InterviewData}
                    />
                    <div className='max-md:pb-20 flex items-end justify-end gap-5'>
                        {activequestionIndex > 0 &&
                            <Button className='flex justify-between items-center gap-2' onClick={() => setActiveQuestionIndex(activequestionIndex - 1)}> <ArrowLeftSquare /> Previous </Button>
                        }
                        {
                            activequestionIndex != mockInterviewQuestions?.length - 1 &&
                            <Button className='flex justify-between items-center gap-2' onClick={() => setActiveQuestionIndex(activequestionIndex + 1)}>Next  <ArrowRightSquare /></Button>
                        }
                        {
                            activequestionIndex == mockInterviewQuestions?.length - 1 &&
                            <Link href={'/dashboard/interview/' + InterviewData?.mockId + '/feedback'}>
                                <Button>End Interview</Button>
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StartInterview