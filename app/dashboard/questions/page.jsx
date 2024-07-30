'use client'
import { chatSession } from '@/utils/GiminiAIModal'
import React, { useState } from 'react'
import QuestionsCard from './_components/Questions'
import { Button } from '@/components/ui/button'

const Questions = () => {
    const QuestionPrompt = 'Give 10 Interview Practice Questions in the technical field. Give Questions and answers in JSON format, no other note'
    const [Questions, setQuestions] = useState();

    const GetPracticeQuestions = async () => {
        const result = await chatSession.sendMessage(QuestionPrompt)
        const QuestionResp = (result.response.text()).replace('```json', '').replace('```', '');

        setQuestions(JSON.parse(QuestionResp))

    }
    return (
        <div className='p-10'>
            <h2 className='text-2xl font-bold '>Practice Questions</h2>
            <Button onClick={GetPracticeQuestions}>Get Interview Questions</Button>
            <div>
                <QuestionsCard
                    Questions={Questions}
                />
            </div>
        </div>
    )
}

export default Questions