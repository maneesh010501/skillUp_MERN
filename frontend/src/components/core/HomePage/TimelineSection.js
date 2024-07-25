import React from 'react'
import TimelineImage from '../../../assets/Images/TimelineImage.png'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'

const TimelineSection = () => {
    return (
        <div className="w-3/4 mx-auto mt-16 border flex">
            <div className='flex flex-col border justify-center w-1/2'>
                <div className='flex border my-4'>
                    <img src={Logo1} className='mx-5' />
                    <div className='flex flex-col my-4'>
                        <span className='font-semibold'>Leadership</span>
                        <span className='text-sm'>Fully committed to success of the company</span>
                    </div>
                </div>
                <div className='flex border my-4'>
                    <img src={Logo2} className='mx-4' />
                    <div className='flex flex-col my-4'>
                        <span className='font-semibold'>Responsibility</span>
                        <span className='text-sm'>Students are always our top priority</span>
                    </div>
                </div>
                <div className="flex border my-4">
                    <img src={Logo3} className='mx-4' />
                    <div className='flex flex-col my-4'>
                        <span className='font-semibold'>Flexibilty</span>
                        <span className='text-sm'>The ability to switch is always an important skill</span>
                    </div>
                </div>
                <div className="flex border my-4">
                    <img src={Logo4} className='mx-4' />
                    <div className='flex flex-col my-4'>
                        <span className='font-semibold'>Solve the problem</span>
                        <span className='text-sm'>Code your way to a solution</span>
                    </div>
                </div>
            </div>
            <div className="py-11 relative">
                <img src={TimelineImage} className='shadow-2xl shadow-black' />
                <div className="absolute bg-caribbeangreen-700 flex text-white left-[9%] bottom-[0%] h-[20%] w-5/6 justify-between items-center shadow-2xl shadow-caribbeangreen-700">
                    <div className='flex ml-3 items-center'>
                        <p className='text-5xl mr-3'>10+</p>
                        <div className="flex flex-col justify-center text-sm">
                            <p>Years of</p>
                            <p>Experience</p>
                        </div>
                    </div>

                    <div className='flex mr-4 items-center'>
                        <p className='text-5xl mr-3'>250+</p>
                        <div className="flex flex-col justify-center text-sm">
                            <p>Different types of</p>
                            <p>courses</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimelineSection
