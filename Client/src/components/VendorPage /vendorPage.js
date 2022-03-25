import { React, useContext, useEffect, useState } from "react";
import "../LandingPage/landingpage.css";
import "../Illustartions/RadialRed";
import s1 from "../../assets/s11.jpeg";
import s2 from "../../assets/s2.jpeg";
import s3 from "../../assets/s3.jpeg";
import VendorHero from "./VendorHero/VendorHero";
import VendorSlider from "./VendorSlider/vendorSlider";


import Navbar from "../Navbar/Navbar";
import RadialRed from "../Illustartions/RadialRed";
import Footerpic from "../Footerpic/Footerpic";
import CameraSvg from "../Camerasvg/CameraSvg";
import Parallax from "react-rellax";
import VendorContext from "../../context/VendorContext";
import coverpic from "../../assets/userPage3.jpg";
import axios from "../../axios/axios";
import "./vendorPage.css";



const navbarlinks = [
  { url: "", title: "Home" },
  { url: "", title: "Contact" },
  { url: "", title: "About  " },
];

const VendorLandingPage = () => {
  const { currentVendor } = useContext(VendorContext);
  const [cvendor, setCvendor] = useState(null);
  useEffect(() => {
    const getVendor = async () => {
      try {
        console.log("get vendor called in Landing page");

        const resp = await axios.get(
          "/vendors/getbyId?vendorId=" + currentVendor?.aud
        );
        console.log(resp.data, " Current user Details");

        let vendor = resp.data;

        setCvendor(vendor);
      } catch (error) {
        console.log(error);
      }
    };

    getVendor();
  }, []);


  
  return (
    <div className="landing__page">
      <Navbar navbarLinks={navbarlinks} />
      <VendorHero vendor={cvendor} imgSrc={coverpic} />

    
      <Parallax speed={-5}>
        <CameraSvg></CameraSvg>
      </Parallax>

      <RadialRed></RadialRed>
      

      <VendorSlider title={"Camera"} />
      

      <Footerpic></Footerpic>
    </div>
  );
};

export default VendorLandingPage;
