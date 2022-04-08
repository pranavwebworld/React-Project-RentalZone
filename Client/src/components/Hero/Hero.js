import { withStyles } from '@mui/material'
import React from 'react'
import './hero.css'
import  VideoSVG from  "../VideographerSvg/Videographer"



const Hero = ({imgSrc}) => {
    return (
        <div className="hero" >
            <img src={imgSrc} alt='Title' className='hero__image' />
            <div className="gradDiv" ></div>

            <div className="videoSVG" >
{/* 
                <VideoSVG  ></VideoSVG> */}
            </div>
           
            <h1  className="hero__titleL animate" > <span style={{ color: "#5D5D5D" }}  > Rental </span> <span style={{ color: "#ab1941"  }}  > Zone  </span></h1>
            
        </div>
    )
}

export default Hero
