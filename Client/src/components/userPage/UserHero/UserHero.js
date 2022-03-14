import { withStyles } from '@mui/material'
import React from 'react'
import './userhero.css'




const Hero = ({imgSrc}) => {
    return (
        <div className="hero" >
            <img src={imgSrc} alt='Title' className='hero__image' />
            <div className="gradDiv" ></div>

            <div className="videoSVG" >
{/* 
                <VideoSVG  ></VideoSVG> */}
            </div>
           
            <h1  className="hero__title animate" > <span style={{ color: "#5D5D5D" }}  > Welcome   </span> <span style={{ color: "#ab1941"  }}  > Pranav   </span>    </h1>
            
        </div>
    )
}

export default Hero
