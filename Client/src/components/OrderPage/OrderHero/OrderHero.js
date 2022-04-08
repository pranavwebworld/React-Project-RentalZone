import { withStyles } from "@mui/material";
import usePagination from "@mui/material/usePagination/usePagination";
import { React, useState,useEffect,useContext } from "react";
import axios from "../../../axios/axios";

import "./orderhero.css";

import AuthContext from "../../../context/AuthContext";


const CategoryHero= ({ user, imgSrc,title}) => {
  
  const { CurrentUser } = useContext(AuthContext);
  const [previewSource, setPreviewSource] = useState();
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedfile] = useState("");



  return (
    <div className="hero">

      <img src={imgSrc} alt="Title" className="hero__image" />

      <div className="gradDiv"></div>
      <div className="videoSVG">
        {/* 
                <VideoSVG  ></VideoSVG> */}
      </div>

      <h1 className="hero__title animate">

        <span style={{ color: "lightgrey", fontSize: "4rem" }}> {title} Orders</span>
      </h1>
    </div>
  );
};

export default CategoryHero;