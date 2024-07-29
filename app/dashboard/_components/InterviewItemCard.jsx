import { Button } from '@/components/ui/button'
import { Play, MessageCircleWarning } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const InterviewItemCard = ({ interview }) => {
    const router = useRouter();
    const onStart = () => {
        router.push('/dashboard/interview/' + interview.mockId)
    }
    const onFeedback = () => {
        router.push('/dashboard/interview/' + interview.mockId + '/feedback')
    }
    return interview && (
        <div className='border shadow-sm rounded-lg p-3'>
            <h2 className='font-bold text-primary'>{interview.jobPosition}</h2>
            <h2 className='text-gray-600 text-sm'><strong>{interview.jobExperience}</strong>{interview.jobExperience > 1 ? ' years' : ' year'} of Experience</h2>
            <h2 className='text-gray-600 text-sm'>{interview.jobDesc}</h2>
            <h2 className='text-gray-400 text-xs'>Created At : <strong>{interview.createdAt}</strong></h2>
            <div className='gap-3 my-2 flex justify-end'>
                <Button
                    onClick={onFeedback}
                    variant='outline' size='sm'><MessageCircleWarning /> <span className='md:hidden xl:block'> Feedback</span></Button>
                <Button
                    onClick={onStart}
                    size='sm'><Play /><span className='md:hidden xl:block'> Start</span> </Button>
            </div>
        </div>
    )
}

export default InterviewItemCard