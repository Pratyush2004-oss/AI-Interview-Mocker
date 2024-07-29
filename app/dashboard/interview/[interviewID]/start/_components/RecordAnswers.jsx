'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react'

const RecordAnswers = () => {

    const [userAnswer, setUserAnswer] = useState('');
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(() => {
        results.map((result) => (
            setUserAnswer(prevAns => prevAns + result?.transcript)

        ))

    }, [results])

     const SaveUserAnswer = () => {
        if(isRecording){
            stopSpeechToText();
            if(userAnswer.length < 10)
            {
                
                return;
            }
        }
        else{
            startSpeechToText()
        }
     }

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
            onClick={SaveUserAnswer}
            >
                {isRecording ? <h2 className='text-red-600 flex gap-2'><Mic /> Stop Recording...</h2>
                    : "Record Answer"
                }
            </Button>

            <Button onClick={()=>console.log(userAnswer)}> Show User Answer</Button>
        </div>
    )
}

export default RecordAnswers