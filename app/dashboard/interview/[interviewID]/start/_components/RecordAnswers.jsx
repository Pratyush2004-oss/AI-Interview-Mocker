'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GiminiAIModal'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'

const RecordAnswers = ({ activequestionIndex, mockInterviewQuestions, InterviewData }) => {

    const { user } = useUser();
    const [loading, setLoading] = useState(false);

    const [userAnswer, setUserAnswer] = useState('');
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(() => {
        results.map((result) => (
            setUserAnswer(prevAns => prevAns + result?.transcript)

        ))
    }, [results])

    useEffect(() => {
        if (!isRecording && userAnswer.length > 10) {
            updateUserAnswer()
        }

    }, [userAnswer])

    const StartStopRecording = async () => {
        if (isRecording) {
            stopSpeechToText();
            if (userAnswer.length < 10) {
                setLoading(false)
                toast('Error while saving your Response,Please record again')
                return;
            }
        }
        else {
            startSpeechToText()
        }
    }

    {/* Update User answer in DB */ }
    const updateUserAnswer = async () => {
        setLoading(true)
        const feedbackPrompt = 'Question: ' + mockInterviewQuestions[activequestionIndex].question + ', User Answer : ' + userAnswer + ',Depends on Question and User Answer for given interview question, ' + 'Please give us rating for answer and feedback as area of improvement in just 3 to 5 lines to imporove it in JSON format with rating field and feedback field';

        const result = await chatSession.sendMessage(feedbackPrompt);
        const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '')
        console.log(mockJsonResp)
        const JsonFeedbackResp = JSON.parse(mockJsonResp);

        const userresp = await db.insert(UserAnswer).values({
            mockIdRef: InterviewData?.mockId,
            question: mockInterviewQuestions[activequestionIndex].question,
            correctAnswer: mockInterviewQuestions[activequestionIndex].answer,
            userAnswer: userAnswer,
            feedback: JsonFeedbackResp?.feedback,
            rating: JsonFeedbackResp?.rating,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MM-yyyy')
        })
        if (userresp) {
            toast('User Answer Recorded Successfully....')
            setResults([])
        }
        setUserAnswer('')
        setResults([])
        setLoading(false);
    }

    if (error) return <p>Web Speech API is not available in this browser, Use Chrome Browser instead 🤷‍</p>;

    return (
        <div>
            <div className='flex flex-col justify-center items-center bg-black rounded-lg p-5 mt-10'>
                <Image src={'/Webcam.png'} width={100} height={100} alt='webcam'
                    className='absolute'
                />

                {/* Webcam */}
                <Webcam
                    mirrored={true}
                    style={{
                        height: 300,
                        width: '100%',
                        zIndex: 10
                    }}
                />
            </div>

            <Button variant='outline' className='w-full my-10'
                onClick={StartStopRecording}
            >
                {isRecording ? <h2 className='text-red-600 flex gap-2'><Mic /> Stop Recording...</h2>
                    : "Record Answer"
                }
            </Button>
        </div>
    )
}

export default RecordAnswers