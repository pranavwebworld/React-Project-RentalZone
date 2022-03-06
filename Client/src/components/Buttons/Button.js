import React from 'react'
import './Button.css'
import '../Slider/slider.css'
import { useInView } from 'react-intersection-observer';



const Button = () => {

    const { ref, inView, entry } = useInView({

        threshold: 0.2,
    });



    const renderContent = () => {
     
            return (
                <div  className="wrapDiv"  >


                    
                    <button className="landingButton1" > <span className="bfont" > Rent a product  </span>   </button>

                
                       
                    
                    <button className="landingButton2" > <span className="bfont"  >  Rentout your product        </span>    </button>
            


               
              
                   
                  
                </div>
            );
        
    };


    return (
        <div className={inView ? 'slider slider--zoom' : 'slider'} ref={ref} >
            {renderContent()}

        </div>
    );





   
}

export default Button
