import { withStyles } from "@mui/material";
import usePagination from "@mui/material/usePagination/usePagination";
import { React, useState } from "react";
import axios from "../../../axios/axios";

import "./producthero.css";


const Hero = ({ vendor, imgSrc }) => {

  const [previewSource, setPreviewSource] = useState();
  const [fileInputState, setFileInputState] = useState("");
  const [fileInputState2, setFileInputState2] = useState("");
  const [fileInputState3, setFileInputState3] = useState("");
  const [selectedFile, setSelectedfile] = useState("");



  const previewFile = async  (file) => {

    console.log('called previewfile');

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async() => {

      // setPreviewSource(reader.result);

      uploadImage(reader?.result)
     
    };
  };

  const previewFile2 = async (file2) => {

    console.log('called previewfile');

    const reader2 = new FileReader();
    reader2.readAsDataURL(file2);
    reader2.onloadend = async () => {

      // setPreviewSource(reader.result);

      uploadImage(reader2?.result)

    };
  };


  const previewFile3 = async (file3) => {

    console.log('called previewfile');

    const reader3 = new FileReader();
    reader3.readAsDataURL(file3);
    reader3.onloadend = async () => {

      // setPreviewSource(reader.result);

      uploadImage(reader3?.result)

    };
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

  var loadFile2 = function (event) {
    const file2 = event.target.files[0];
    var image2 = document.getElementById("output2");
    image2.src = URL.createObjectURL(event.target.files[0]);
    previewFile2(file2);
  };


  var loadFile3 = function (event) {
    const file3= event.target.files[0];
    var image3 = document.getElementById("output3");
    image3.src = URL.createObjectURL(event.target.files[0]);
    previewFile3(file3);
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
          <div class="product-pic">
            <label class="-label" for="file">
              <span class="glyphicon glyphicon-camera"></span>
              <span>Change Image</span>
            </label>
            <input id="file"  name="proImage" type="file" onChange={loadFile}/>
          <img src={vendor?.propic} id="output" width="00" />
          </div>
        </div>



      <div className="chatOnlin2" >
        <div class="product-pic2">
          <label class="-label" for="file">
            <span class="glyphicon glyphicon-camera"></span>
            <span>Change Image</span>
          </label>
          <input id="file2" name="proImage1" type="file" onChange={loadFile2} />
          <img src={vendor?.propic} id="output2" width="00" />
        </div>
      </div>


      <div className="chatOnlin3" >
        <div class="product-pic3">
          <label class="-label" for="file">
            <span class="glyphicon glyphicon-camera"></span>
            <span>Change Image</span>
          </label>
          <input id="file3"    name="proImage2  " type="file" onChange={loadFile3} />
          <img src={vendor?.propic} id="output3" width="00" />
        </div>
      </div>


      <h1 className="hero__title animate">
        <span style={{ color: "#5D5D5D" }}> Register A product </span>
      </h1>
    </div>
  );
};

export default Hero;