import { React,useContext}from "react";
import "../LandingPage/landingpage.css";
import "../Illustartions/RadialRed";
import coverpic from "../../assets/userPage3.jpg";
import s1 from "../../assets/s11.jpeg";
import s2 from "../../assets/s2.jpeg";
import s3 from "../../assets/s3.jpeg";
import UserHero from "./UserHero/userHero";
import UserSlider from "./UserSlider/UserSlider";
import Navbar from "../Navbar/Navbar";
import RadialRed from "../Illustartions/RadialRed";
import Footerpic from "../Footerpic/Footerpic";
import CameraSvg from "../Camerasvg/CameraSvg";
import Parallax from "react-rellax";
import AuthContext from '../../context/AuthContext';


const navbarlinks = [
    { url: "", title: "Home" },
    { url: "", title: "Contact" },
    { url: "", title: "About  " },
];

const LandingPage = () => {

    const { currentUser } = useContext(AuthContext)

    return (

        <div className="landing__page">

            <Navbar navbarLinks={navbarlinks} />
            <UserHero user={currentUser}   imgSrc={coverpic} />

            <Parallax speed={-5}>
                <CameraSvg></CameraSvg>
            </Parallax>
      
            <RadialRed></RadialRed>

            <UserSlider
                title={"Camera"}/>
    
            <Footerpic></Footerpic>
        </div>


    );
};

export default LandingPage;
