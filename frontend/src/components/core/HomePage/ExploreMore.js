import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import CourseCard from './CourseCard';

const tabsName = ['Free', 'New to coding', 'Most popular', 'Skills paths', 'Career paths'];

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((courses) => courses.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

    return (
        <div className='w-3/4 flex flex-col items-center text-white border mx-auto h-[300px] mt-16'>
            <div className='text-3xl mt-3'>Unlock the <span className='font-bold text-cyan'>Power of Code</span></div>
            <div className='mt-2 text-richblack-200'>Learn to build anything you imagine</div>
            <div className='flex mt-7 bg-richblack-800 rounded-full p-1'>
                {
                    tabsName.map((element, index) => {
                        return (
                            <div className={`p-1 px-4 
                            ${currentTab === element ? "bg-richblack-900 rounded-full cursor-pointer" : "text-richblack-200 cursor-pointer"}`}
                                key={index}
                                onClick={() => setMyCards(element)}>
                                {element}</div>
                        )
                    })
                }
            </div>
            <div>
                {/* cards */}
                <div className='flex'>
                    {
                        courses.map((element, index) => {
                            return (
                                <CourseCard
                                    key={index}
                                    cardData={element}
                                    currentCard={currentCard}
                                    setCurrentCard={setCurrentCard}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ExploreMore