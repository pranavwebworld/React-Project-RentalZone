import { React,useContext}from "react";
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
import AuthContext from '../../context/AuthContext';
import coverpic from "../../assets/userPage3.jpg";


const navbarlinks = [
    { url: "", title: "Home" },
    { url: "", title: "Contact" },
    { url: "", title: "About  " },
];

const VendorLandingPage = () => {

    const { currentUser } = useContext(AuthContext)

    return (


        <div className="landing__page">

            <Navbar navbarLinks={navbarlinks} />
            <VendorHero user={currentUser}   imgSrc={coverpic} />

            <Parallax speed={-5}>
                <CameraSvg></CameraSvg>
            </Parallax>
      
            <RadialRed></RadialRed>

            <VendorSlider
                title={"Camera"}/>
    
            <Footerpic></Footerpic>
        </div>


    );
};

export default VendorLandingPage;
