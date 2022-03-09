import React from "react";
import "./Button.css";
import "../Slider/slider.css";
import { useInView } from "react-intersection-observer";
import VideoSVG from "../VideographerSvg/Videographer.jsx"

const Button = () => {
  const { ref, inView, entry } = useInView({
    threshold: 0.2,
  });

  const renderContent = () => {
    return (
      <div className="wrapDiv">
        {/* <button className="landingButton1" > <span className="bfont" > Rent a product  </span>   </button> */}

            <button id="B1"  className="landingButton1" >
          <span></span>
          <span></span>
          <span></span>
          <span></span> Register a Device
        </button>


      
      {/* <VideoSVG   className="VideoSVG"  ></VideoSVG> */}
          
        <button id="B1" style={{ left: "75%" }} className="landingButton2" >
                <span></span>
                <span></span>
                <span></span>
                <span></span> Rent a   Device
        </button>
      </div>
    );
  };

  return (
    <div className={inView ? "slider slider--zoom" : "slider"} ref={ref}>
      {renderContent()}
    </div>
  );
};


export default Button;
