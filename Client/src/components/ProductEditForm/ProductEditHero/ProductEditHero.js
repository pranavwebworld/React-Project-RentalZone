import { withStyles } from "@mui/material";
import usePagination from "@mui/material/usePagination/usePagination";
import { React, useState } from "react";
import axios from "../../../axios/axios";

import "./productedithero.css";


const Hero = ({ vendor, imgSrc }) => {

  



  return (

    <div className="hero">
      <img src={imgSrc} alt="Title" className="hero__image" />
      <div className="gradDiv"></div>
      <div className="videoSVG">
        {/* 
                <VideoSVG  ></VideoSVG> */}
      </div>

    
      <h1 className="hero__title animate">
        <span style={{ color: "#5D5D5D" }}> Register A product </span>
      </h1>
    </div>
  );
};

export default Hero;