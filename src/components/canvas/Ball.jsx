import React from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

const Ball = ({ index, title, icon }) => {
  return (
    <Tilt className='xs:w-[250px] w-full'>
      <motion.div
        // Use fadeIn or similar function you have for animation
        className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
      >
        <div
          className='bg-gray-800 rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
        >
          <img
            src={icon}
            alt={title}
            className='w-16 h-16 object-contain'
          />
          <h3 className='text-slate-500 text-[20px] font-bold text-center'>
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

export default Ball;
