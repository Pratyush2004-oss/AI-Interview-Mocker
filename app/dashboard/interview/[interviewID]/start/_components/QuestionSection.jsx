import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

const QuestionSection = ({ mockInterviewQuestions, activequestionIndex }) => {

  const texttoSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech)
    }
    else {
      alert('Your Browser doesnot support Trxt to Speech')
    }
  }


  return mockInterviewQuestions && (
    <div className='p-5 border rounded-lg my-10'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {mockInterviewQuestions && mockInterviewQuestions.map((question, idx) => (
          <h2 className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${activequestionIndex == idx && 'bg-purple-500 text-white'}`}>Question #{idx + 1}</h2>
        ))}

      </div>
      <h2 className='my-5 max-md:text-sm'>{mockInterviewQuestions[activequestionIndex].question}</h2>
      <Volume2 className='cursor-pointer' onClick={() => texttoSpeech(mockInterviewQuestions[activequestionIndex].question)} />

      <div className='border rounded-lg p-4 bg-blue-100 mt-24'>
        <h2 className=' flex items-center text-primary'>
          <Lightbulb />
          <strong>NOTE: <hr /></strong>
        </h2>
        <h2 className='text-justify text-sm my-2 text-primary'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
      </div>

    </div>
  )
}

export default QuestionSection