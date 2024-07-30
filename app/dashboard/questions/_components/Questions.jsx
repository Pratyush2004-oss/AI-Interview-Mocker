import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react';

const QuestionsCard = ({ Questions }) => {
    return Questions && (
        <div className='pb-20'>
            {Questions.map((question, idx) => (
                <Collapsible key={idx} className='mt-10 border-4 rounded-lg'>
                    <CollapsibleTrigger className='p-2 w-full bg-secondary flex gap-3 justify-between rounded-lg my-2 text-justify'>{question.question} <ChevronsUpDown className='h-5 w-5' /> </CollapsibleTrigger>
                    <CollapsibleContent>
                        <div className='flex flex-col gap-2'>
                            <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900 text-justify'><strong>Answer : </strong> {question.answer}</h2>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            ))}
        </div>
    )
}

export default QuestionsCard