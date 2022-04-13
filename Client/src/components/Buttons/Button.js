import React from "react";

import "./Button.css";

import { useInView } from "react-intersection-observer";
import VideoSVG from "../VideographerSvg/Videographer.jsx"
import { useNavigate } from 'react-router';



const Button = () => {
  const navigate = useNavigate()
  const { ref, inView, entry } = useInView({
    threshold: 0.2,
  });

  const renderContent = () => {
    return (
      <div className="wrapDiv">
        {/* <button className="landingButton1" > <span className="bfont" > Rent a product  </span>   </button> */}

        <button onClick={() => { navigate('/vendorSignup') }}  id="B1"  className="landingButton1" >
          <span></span>
          <span></span>
          <span></span>
          <span></span> Register a Device
        </button>


      
      {/* <VideoSVG   className="VideoSVG"  ></VideoSVG> */}
          
        <button onClick={ ()=>{navigate('/Signup') } }   id="B1" style={{ left: "75%" }} className="landingButton2" >
                <span></span>
                <span></span>
                <span></span>
                <span></span> Rent a   Device
        </button>
      </div>
    );
  };

  return (
    <div className={inView ? "Lslider Lslider--zoom" : "Lslider"} ref={ref}>
      {renderContent()}
    </div>
  );
};


export default Button;
