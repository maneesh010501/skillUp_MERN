import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import TimelineSection from '../components/core/HomePage/TimelineSection'
import LanguageSection from '../components/core/HomePage/LanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import Footer from '../components/common/Footer'
import ExploreMore from '../components/core/HomePage/ExploreMore'

const Home = () => {
    return (
        <div>
            {/* sec1 */}
            <div className='relative mx-auto flex flex-col w-3/4 items-center text-white justify-between'>
                <Link to={'/signup'}>
                    <div className='mt-10 mx-auto rounded-lg bg-richblack-800 text-richblack-200 p-2 px-4 w-52'>
                        <div className='flex justify-between items-center'>
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>

                <div className='mt-7 text-center text-3xl'>
                    Unlock endless possibilities for your future with <span className='font-bold text-cyan'>Coding Skills</span>
                </div>

                <div className='mt-3 text-center text-base text-richblack-200 px-16'>
                    Whether you want to learn a new skill or share what you know with the world, you're in the right place. As a leading online learning platform, we're here to help you achieve your goals and transform your life.
                </div>

                <div className='mt-5 flex'>
                    <Link to={'/signup'}>
                        <button className='mx-3 rounded-lg bg-yellow-50 text-black p-2 px-4 w-32'>Learn more</button>
                    </Link>
                    <Link to={'/login'}>
                        <button className='mx-3 rounded-lg bg-richblack-800 text-richblack-200 p-2 px-4 w-32'>Book a demo</button>
                    </Link>
                </div>

                <div className='mt-10 w-2/3'>
                    <video muted loop autoPlay className='rounded-lg'>
                        <source src={Banner} type='video/mp4' />
                    </video>
                </div>

                <div className='mt-14'>
                    <CodeBlocks position={'flex-row'} margin={'ml-36'}
                        heading={
                            <div>Unlock your <span className='font-bold text-cyan'>coding potential</span> with our online courses.</div>
                        }
                        subheading={'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'}
                    />

                </div>

                <div>
                    <CodeBlocks position={'flex-row-reverse'} margin={'mr-36'}
                        heading={
                            <div>Start <span className='font-bold text-cyan'>coding in seconds</span></div>
                        }
                        subheading={'In our hands-on learning environment you will be writing code from your very first lesson. Go ahead, give it a try.'} />
                </div>

            </div>

            <ExploreMore />

            {/* sec2 */}
            <div className='bg-pure-greys-5 text-richblack-700'>
                <div className='w-3/4 h-[300px] flex items-center mx-auto justify-center border'>

                    <button className='mx-3 mt-52 rounded-lg bg-yellow-50 text-black p-2 px-4 w-52'>
                        <Link to={'/signup'} className='flex items-center justify-between'>Explore Full Catalog<FaArrowRight /></Link>
                    </button>


                    <button className='mx-3 mt-52 rounded-lg bg-richblack-800 text-richblack-200 p-2 px-4 w-32'>
                        <Link to={'/login'}>Learn more</Link>
                    </button>
                </div>
                <div className='w-3/4 mx-auto mt-16 h-[120px] border'>
                    <div className='flex justify-between'>

                        <div className='text-3xl'>Get the skills you need for a <span className='font-bold text-lightcyan'>job that is in demand.</span>
                        </div>
                        <div className='flex flex-col border'>
                            <div className='text-richblack-200'>Start today. Dive into the world of coding, unlock your full potential in the digital age and open countless doors of opportunities.
                            </div>
                            <div className='mt-7'>
                                <Link to={'/login'}>
                                    <button className='rounded-lg bg-yellow-50 text-black p-2 px-4 w-32'>Learn more</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <TimelineSection />
                <LanguageSection />
            </div>
            {/* sec3 */}
            <div className=''>
                <InstructorSection />
            </div>
            <Footer />
        </div>
    )
}

export default Home