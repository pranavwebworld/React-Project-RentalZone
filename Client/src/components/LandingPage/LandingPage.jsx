import React from "react";
import "./landingpage.css";
import "../Illustartions/RadialRed";
import coverpic from "../../assets/cover.jpeg";
import s1 from "../../assets/s11.jpeg";
import s2 from "../../assets/s2.jpeg";
import s3 from "../../assets/s3.jpeg";
import Hero from "../Hero/Hero";
import Slider from "./Slider/LSlider";
import HomeNavbar from "../HomeNavbar/HomeNavbar";
import Button from "../Buttons/Button";
import RadialRed from "../Illustartions/RadialRed";
import CameraSvg from "../Camerasvg/CameraSvg";
import Footerpic from "../Footerpic/Footerpic";
import Parallax from "react-rellax";
import Footer from "../Footer/Footer";




const LandingPage = () => {
  return (

    
    <div className="landing__page">

      <HomeNavbar  />
      <Hero imgSrc={coverpic} />

      {/* 
      <Parallax speed={-5} >
        <Videographer></Videographer>
      </Parallax> */}


      <Parallax speed={-5}>
        <CameraSvg></CameraSvg>
      </Parallax>
      <Button></Button>
      <RadialRed></RadialRed>
      <Slider
        imageSrc={s1}
        title={"List Your Gear"}
        subtitle={
          "If you own a camera or any other photography ,videography gear, just list it with us through our simple product listing interface."
        }/>
      <Slider
        imageSrc={s2}
        title={"Safe and Secure"}
        subtitle={
          "We insure your product and all our customers are dually verified for address & identity."
        }
        flipped={true}
      />
      
      <Slider
        imageSrc={s3}
        title={"24x7 Service "}
        subtitle={
          "You can book your product at any time,our service will be available for 24x7"
        }
      />
      {/* <Footerpic></Footerpic> */}
      <Footer></Footer>

    </div>


  );
};

export default LandingPage;
