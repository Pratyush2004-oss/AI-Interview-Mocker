import React from 'react'

const Works = () => {
    return (
        <div className='py-10'>
            <h2 className='text-2xl font-bold text-primary font-serif'>How It Works ?</h2>
            <div className='p-4 border rounded-lg shadow-md bg-blue-100 text-blue-900'>
                <div className='my-4'>
                    <h2 className='text-xl font-semibold border-b-2 font-serif'>Sending Message to AI</h2>
                    <p className='text-sm'>User have to fill few details about what Interview they want to prepare like : </p>
                    <ul style={{ listStyle: 'circle' }}>
                        <li className='ml-5'>Job Position</li>
                        <li className='ml-5'>Job Description</li>
                        <li className='ml-5'>Years of Experience</li>
                    </ul>
                </div>

                <div className='my-4'>
                    <h2 className='text-xl font-semibold border-b-2 font-serif'>How AI Response</h2>
                    <p className='text-sm'>After you submit your requirements, now its time for AI to fetch Interview questions on the basis of the details you have inserted. </p>
                </div>

                <div className='my-4'>
                    <h2 className='text-xl font-semibold border-b-2 font-serif'>How it can help You?</h2>
                    <p className='text-sm'>After getting the questions, now you can start the Interview practice. You can actually speak the ansswers and then your answers will be recorded.  </p>
                </div>

                <div className='my-4'>
                    <h2 className='text-xl font-semibold border-b-2 font-serif'>Get Feedback of the answers you have given!!</h2>
                    <p className='text-sm'>After completing the Interview now you can actually check for the answers you have given and the relevancy of the answer you hava given to the perticular question. This will rate your answer and provide relevant answer and feedback for Imporovement.  </p>
                </div>

                <div className='my-4'>
                    <h2 className='text-xl font-semibold border-b-2 font-serif'>Additional !!</h2>
                    <p className='text-sm'>In this page, at the <strong>Question </strong> section you will get multiple questions along with their answers to practice for your interview. </p>
                </div>
            </div>
        </div>
    )
}

export default Works