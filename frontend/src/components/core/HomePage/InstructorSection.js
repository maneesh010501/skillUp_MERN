import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
    return (
        <div className='w-3/4 h-[900px] mx-auto flex flex-col border border-white text-white mt-16'>
            <div className="flex">
                <img src={Instructor} className='h-[400px] shadow-xl shadow-white' />
                <div className="flex flex-col items-center mx-5 h-[400px] border">
                    <div className='text-3xl mt-24'>Become an <span className='font-bold text-cyan'>Instructor
                    </span></div>
                    <div className='mt-3 text-richblack-200 text-center'>Instructors from around the world teach millions of students on SkillUp. We provide all the tools to help you share your knowledge. Teach what you know and help learners explore their interests, gain new skills, and advance their careers.</div>
                    <Link to={'/signup'} className='mt-5'>
                        <button className='mx-3 rounded-lg bg-yellow-50 text-black p-2 px-4 w-48 flex items-center justify-between'>Start teaching today<FaArrowRight /></button>
                    </Link>
                </div>
            </div>
            <div>
                <h2 className='text-center text-3xl mt-28'>Review from the <span className='font-bold text-cyan'>learners</span></h2>
            </div>
        </div >
    )
}

export default InstructorSection
