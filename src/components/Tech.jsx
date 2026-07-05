import React from "react";

import Ball from "./canvas/Ball"; // Adjust the path as necessary
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  return (
    <div className='flex flex-wrap justify-center gap-4'> 
      {technologies.map((technology, index) => (
        <div className='w-64 m-2' key={technology.name}> 
          <Ball 
            index={index}
            title={technology.name}
            icon={technology.icon} 
          />
        </div>
      ))}
    </div>
  );
};


export default SectionWrapper(Tech, "");
