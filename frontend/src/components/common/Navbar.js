import React from 'react'
import { Link } from 'react-router-dom'
import { FaChevronDown } from "react-icons/fa";
import { IoIosRocket } from "react-icons/io";
// import { useLocation } from 'react-router-dom';

const Navbar = () => {
    // const location = useLocation();
    // const matchRoute = (route) => {
    //     return matchRoute({ path: route }, location.pathname);
    // }
    return (
        <div className='flex h-16 border-b-2 border-richblack-500 text-white items-center justify-between'>

            <div className='flex items-center'>
                <Link to='/' className='pl-7 text-3xl'>
                    <span className='flex items-center font-mono'>SkillUp<IoIosRocket /></span>
                </Link>
            </div>

            <div className='w-1/2 flex justify-center text-richblack-200 ml-5'>
                <Link to='/' className='px-7 hover:text-yellow-5'>
                    <span>Home</span>
                </Link>
                <Link to='/' className='px-7 hover:text-yellow-5'>
                    <span className='flex items-center justify-between w-[75px]'>Catalog <FaChevronDown /></span>
                </Link>
                <Link to='/about' className='px-7 hover:text-yellow-5'>
                    <span>About Us</span>
                </Link>
                <Link to='/contact' className='px-7 hover:text-yellow-5'>
                    <span>Contact Us</span>
                </Link>
            </div>

            <div className='text-richblack-200 pr-9'>
                <Link to={'/login'}>
                    <button className='rounded-lg bg-yellow-50 text-black p-1 mx-2 px-3'>Login</button>
                </Link>
                <Link to={'/signup'}>
                    <button className='rounded-lg bg-richblack-800 text-richblack-200 p-1 mx-2 px-3'>Signup</button>
                </Link>
            </div>

        </div>
    )
}

export default Navbar
