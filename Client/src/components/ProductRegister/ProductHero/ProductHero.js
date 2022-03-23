import { withStyles } from "@mui/material";
import usePagination from "@mui/material/usePagination/usePagination";
import { React, useState } from "react";
import axios from "../../../axios/axios";

import "./producthero.css";


const Hero = ({ vendor, imgSrc }) => {

  const [previewSource, setPreviewSource] = useState();
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedfile] = useState("");


  const handeleProPicChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = async  (file) => {

    console.log('called previewfile');

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async() => {

      // setPreviewSource(reader.result);

      uploadImage(reader?.result)
     
    };
  };



  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) return;

    setTimeout(uploadImage(previewSource),4000)
  };


  const uploadImage = async (base64Img) => {
    console.log(base64Img);
    try { 

     const vendorId=vendor?._id
     console.log({vendorId});
      axios.post("/vendors/proPicUpload", { base64Img,vendorId},{withCredentials:true});
    } catch (error) {
      console.log(error);
    }
  };


  var loadFile = function (event) {
    const file = event.target.files[0];
    var image = document.getElementById("output");
    image.src = URL.createObjectURL(event.target.files[0]);
    previewFile(file);
  };


  return (
    <div className="hero">

      
      <img src={imgSrc} alt="Title" className="hero__image" />

      <div className="gradDiv"></div>
      <div className="videoSVG">
        {/* 
                <VideoSVG  ></VideoSVG> */}
      </div>

    
        <div className="chatOnlin" >

          <div class="profile-pic">
            <label class="-label" for="file">
              <span class="glyphicon glyphicon-camera"></span>
              <span>Change Image</span>
            </label>
            <input id="file" value={fileInputState} name="proImage" type="file" onChange={loadFile}/>
          <img src={vendor?.propic} id="output" width="100" />
          </div>
        </div>


      <h1 className="hero__title animate">
      
        <span style={{ color: "#5D5D5D" }}> Register A product </span>{" "}

      </h1>
    </div>
  );
};

export default Hero;