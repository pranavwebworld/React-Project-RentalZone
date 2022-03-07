import React from "react";
import "./Button.css";
import "../Slider/slider.css";
import { useInView } from "react-intersection-observer";

const Button = () => {
  const { ref, inView, entry } = useInView({
    threshold: 0.2,
  });

  const renderContent = () => {
    return (
      <div className="wrapDiv">
        {/* <button className="landingButton1" > <span className="bfont" > Rent a product  </span>   </button> */}

            <button style={{ left: "15%" }}  className="landingButton1" >
          <span></span>
          <span></span>
          <span></span>
          <span></span> Rentout your product
        </button>


          
            <button style={{left:"75%"}} className="landingButton1" >
                <span></span>
                <span></span>
                <span></span>
                <span></span> Rent a product
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
