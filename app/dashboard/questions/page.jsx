'use client'
import { chatSession } from '@/utils/GiminiAIModal'
import React, { useState } from 'react'
import QuestionsCard from './_components/Questions'
import { Button } from '@/components/ui/button'

const Questions = () => {
    const [loading, setLoading] = useState(false);
    const QuestionPrompt = 'Give 20 Interview Practice Questions in the technical field. Give Questions and answers in JSON format, no other note'
    const [Questions, setQuestions] = useState();

    const GetPracticeQuestions = async () => {
        setLoading(true)
        const result = await chatSession.sendMessage(QuestionPrompt)
        const QuestionResp = (result.response.text()).replace('```json', '').replace('```', '');

        setQuestions(JSON.parse(QuestionResp))
        setLoading(false)

    }
    return (
        <div className='p-10'>
            <h2 className='text-2xl font-bold '>Practice Questions</h2>
            <Button disabled={loading} onClick={GetPracticeQuestions}>
                {loading ? <span className='loading loading-dots'></span> : 'Get Interview Questions'}
            </Button>
            <div>
                {!Questions && <span className='font-semibold text-xl text-red-500 m-7'>Click the Button to get Interview Questions</span>}
                <QuestionsCard
                    Questions={Questions}
                />
            </div>
        </div>
    )
}

export default Questions