import React from 'react'
import { motion } from "motion/react"
import team1 from '../../assets/team/team1.jpg';
import team2 from '../../assets/team/team2.jpg';


export default function Banner() {
  return (
    <div className="hero bg-base-200 min-h-96">
  <div className="hero-content flex-col lg:flex-row-reverse">
   <div className='flex-1'>

     <motion.img
      src={team1}
      animate={{y:[0,50,0]}}
      transition={{duration: 5, repeat: Infinity}}
      className="max-w-sm border-s-8 border-blue-500 border-b-8 rounded-t-[40px] rounded-r-[40px] shadow-2xl"
    />

    <motion.img
      src={team2}
      animate={{x:[100,150,100]}}
      transition={{duration: 10, delay:5, repeat: Infinity}}
      className="max-w-sm border-s-8 border-blue-500 border-b-8 rounded-t-[40px] rounded-r-[40px] shadow-2xl"
    />

   </div>
    <div className='flex-1'>
      
      <motion.h1 
      initial={{scale: 0}}
      animate={{scale: 1,transition:{duration:4}}} className="text-5xl font-bold">Remote <motion.span animate={{
    color:['#ff5733','#33ff33','8a33ff'],
  transition: { duration: 2, 
    repeat: Infinity}
  }}>Jobs</motion.span> For You</motion.h1>

      <p className="py-6">
       Whether you're searching for the perfect role or looking for the right talent, JobPortal brings both together. Apply in a click, post openings in minutes, and connect directly, all in one place.Or Discover roles that fit your skills, or find the people who fit your team. Simple, fast, and all in one place.
      </p>
    </div>
  </div>
</div>
  )
}
