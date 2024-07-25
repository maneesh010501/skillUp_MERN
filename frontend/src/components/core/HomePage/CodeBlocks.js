import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'

const CodeBlocks = ({ position, margin, heading, subheading }) => {
    return (
        <div className={`flex ${position} my-20 justify-between`}>
            {/* sec1 */}
            <div className="w-1/2 flex flex-col px-2">
                <div className='text-3xl'>
                    {/* Unlock your <span className='font-bold text-cyan'>coding potential</span> with our online courses. */}
                    {heading}
                </div>
                <div className='mt-3 text-base text-richblack-200'>
                    {/* Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you. */}
                    {subheading}
                </div>
                <div className='mt-5 flex'>
                    <Link to={'/signup'}>
                        <button className='mr-5 rounded-lg bg-yellow-50 text-black p-2 px-4 w-40 justify-between flex items-center'>
                            <span>Try it Yourself</span>
                            <FaArrowRight /></button>
                    </Link>
                    <Link to={'/login'}>
                        <button className='rounded-lg bg-richblack-800 text-richblack-200 p-2 px-4 w-40'>Book a demo</button>
                    </Link>
                </div>
            </div>

            {/* sec2 */}
            <div className={`h-fit flex w-[100%] text-sm ${margin} border border-yellow-50 p-1 rounded-lg shadow-lg shadow-yellow-5`}>
                <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                    <p>12</p>
                    <p>13</p>

                </div>
                <div className='w-[90%] flex flex-col font-mono pr-2 text-yellow-50'>
                    <TypeAnimation
                        sequence={[`<!DOCTYPE html>
                        <html lang="en">
                          <head>
                            <meta charset="utf-8" />
                            <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
                            <title>React App</title>
                          </head>
                          <body>
                            <noscript>You need to enable JavaScript to run this app.</noscript>
                            <div id="root"></div>
                          </body>
                        </html>`, 2000, ""]}
                        repeat={Infinity}
                        cursor={true}
                        omitDeletionAnimation={true}
                        style={
                            {
                                whiteSpace: 'pre-line',
                                display: 'block',
                            }
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default CodeBlocks