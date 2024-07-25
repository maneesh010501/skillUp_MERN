import React from 'react'
import know_your_progress from '../../../assets/Images/Know_your_progress.png'
import compare_with_others from '../../../assets/Images/Compare_with_others.png'
import plan_your_lesson from '../../../assets/Images/Plan_your_lessons.png'
import { Link } from 'react-router-dom'

const LanguageSection = () => {
    return (
        <div className="w-3/4 mx-auto mt-16 h-[750px] border flex flex-col">
            <div className='mt-10 mb-3 text-center font-bold text-3xl'>
                Your swiss knife for <span className='font-bold text-lightcyan'>learning any language</span>
            </div>
            <div className='text-center'>Choose a language, start with fundamentals, set clear goals and practice regularly!</div>
            <div className='text-center'>
                Make a custom schedule and track your progress. Stay persistent!
            </div>
            <div className='flex mt-10'>
                <img src={know_your_progress} alt="" className='-mr-32 h-[400px]' />
                <img src={compare_with_others} alt="" className='-mr-32 h-[450px]' />
                <img src={plan_your_lesson} alt="" className='h-[450px]' />
            </div>
            <div className='mx-auto mt-5'>
                <Link to={'/login'}>
                    <button className='rounded-lg bg-yellow-50 text-black p-2 px-4 w-32'>Learn more</button>
                </Link>
            </div>
        </div>
    )
}

export default LanguageSection
