import React from 'react'
import './Lslider.css'
import { useInView } from 'react-intersection-observer';

const Slider = ({ imageSrc, title, subtitle, flipped }) => {

 
        const { ref, inView, entry } = useInView({
          
            threshold: 0.2,
        });



    const renderContent = () => {
        if (!flipped) {
            return (
                <>
                    <img src={imageSrc} alt="Travel" className="Lslider__image" />
                    <div className="Lslider__content">
                        <h1 className="Lslider__title">{title}</h1>
                        <p style={{ color: 'white' }} >{subtitle}</p>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className="Lslider__content">
                        <h1 className="Lslider__title">{title}</h1>
                        <p style={{ color: 'white' }}  >{subtitle}</p>
                    </div>
                    <img src={imageSrc} alt="Travel" className="Lslider__image" />
                </>
            );
        }
    };

    return (
        <div className={inView?'Lslider Lslider--zoom':'Lslider'} ref={ref} >
            {renderContent()}
        
        </div>
    );
};

export default Slider
