import React from 'react'
import './hero.css'


const Hero = ({imgSrc}) => {
    return (
        <div className="hero" >
            <img src={imgSrc} alt='Title' className='hero__image' />
            <div className="gradDiv" ></div>
            <h1 className="hero__title " > Rental Zone  </h1>
            
        </div>
    )
}

export default Hero
