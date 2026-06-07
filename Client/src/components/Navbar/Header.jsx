import React from 'react'
import {Link, NavLink} from 'react-router-dom'

export default function Header() {
    return (
       <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 '>
        <h1 className='w-full text-3xl font-bold text-[#00df9a]'>Heeleo </h1>
        <ul className='flex '>
            <li  className='p-4'> Home </li>
            <li  className='p-4'> CONtact </li>
            <li  className='p-4'> Memebr </li>
            <li  className='p-4'> ABOUT </li>
        </ul>
       </div>
        
    );
}