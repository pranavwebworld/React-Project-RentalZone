import React from 'react'
import './productSlider.css'
import { useInView } from 'react-intersection-observer';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Link, Stack } from '@mui/material';
import { useNavigate } from "react-router";

const Slider = ({ imageSrc, title, subtitle, flipped }) => {

        const navigate = useNavigate();


        const { ref, inView, entry } = useInView({
          
            threshold: 0.2,
        });

        
    const renderContent = () => {
        if (!flipped) {
            return (
                <>
                    {/* <img src={imageSrc} alt="Travel" className="slider__image" />
                    <div className="slider__content">
                        <h1 className="slider__title">{title}</h1>
                        <p style={{ color: 'white' }} >{subtitle}</p>
                    </div> */}

                

                        <div>
                        <button onClick={() => { navigate("/")}} className="VendorButtons" > Register a product  </button>
                        
                        
                        </div>

                </>
            );
        } else {
            return (
                <>
                    <div className="slider__content">
                        <h1 className="slider__title">{title}</h1>
                        <p style={{ color: 'white' }}  >{subtitle}</p>
                    </div>
                    <img src={imageSrc} alt="Travel" className="slider__image" />


                

                </>
            );
        }
    };

    return (
        <div className={inView?'slider slider--zoom':'slider'} ref={ref} >

            {renderContent()}


        </div>
    );
};

export default Slider
