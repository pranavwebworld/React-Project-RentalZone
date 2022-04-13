import { React,useContext,useEffect, useState}from "react";
import "../LandingPage/landingpage.css";
import "../Illustartions/RadialRed";
import coverpic from "../../assets/userPage3.jpg";
import s1 from "../../assets/s11.jpeg";
import s2 from "../../assets/s2.jpeg";
import s3 from "../../assets/s3.jpeg";
import UserHero from "./UserHero/UserHero";
import UserSlider from "./UserSlider/UserSlider"
import UserSlider2 from './UserSlider2/UserSlider2'
import Navbar from "../Navbar/Navbar";
import RadialRed from "../Illustartions/RadialRed";
import Footerpic from "../Footerpic/Footerpic";
import CameraSvg from "../Camerasvg/CameraSvg";
import Parallax from "react-rellax";
import AuthContext from '../../context/AuthContext';
import axios from "../../axios/axios";
import Helmet from "react-helmet"
import Footer from "../Footer/Footer";


const navbarlinks = [
    { url: "", title: "Home" },
    { url: "", title: "Contact" },
    { url: "", title: "About  " },
];

const LandingPage = () => {

    const { currentUser } = useContext(AuthContext)
    const [cuser,setCuser]= useState(null)


    useEffect(() => {

        const getUser = async () => {

            try {

                console.log('get user called in Landing page');

                const resp = await axios.get('/users/getbyId?userId=' + currentUser?.aud);

                console.log(resp.data, " Current user Details");

                let user = resp.data

                setCuser(user)
                console.log({user});
            } catch (error) {

                console.log(error);
            }
        };

        getUser()
    }, [currentUser]);




    return (


        <div className="landing__page">

            <Helmet>
                <title> My Account   </title>
                <meta name="description" content="user personal account account" />
            </Helmet>

            <Navbar navbarLinks={navbarlinks} />
            
            <UserHero user={cuser}   imgSrc={coverpic} />

            <Parallax speed={-5}>
                <CameraSvg></CameraSvg>
            </Parallax>
      
            <RadialRed></RadialRed>

            <UserSlider
                title={"Camera"}/>

            <UserSlider2></UserSlider2>
    
            {/* <Footerpic></Footerpic> */}
            <Footer></Footer>
       
        </div>


    );
};

export default LandingPage;
