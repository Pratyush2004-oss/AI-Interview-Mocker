'use client'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionSection from './_components/QuestionSection';
import RecordAnswers from './_components/RecordAnswers';

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

        const jsonMockResp = JSON.parse(result[0].jsonMockResp)
        setMockinterviewQuestions(jsonMockResp);
        console.log(jsonMockResp)
        setInterviewData(result[0]);
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
                <RecordAnswers/>
            </div>
        </div>
    )
}

export default StartInterview