import { React,useContext,useEffect, useState}from "react";
import "../BookedPage/bookedpage.css";
import "../Illustartions/RadialRed";
import coverpic from "../../assets/CategoryCamera.jpeg";
import s1 from "../../assets/s11.jpeg";
import s2 from "../../assets/s2.jpeg";
import s3 from "../../assets/s3.jpeg";
import BookedHero from "./BookedHero/BookedHero";
import BookedSlider from "./BookedSlider/BookedSlider";
import Navbar from "../Navbar/Navbar";
import RadialRed from "../Illustartions/RadialRed";
import Footerpic from "../Footerpic/Footerpic";
import CameraSvg from "../Camerasvg/CameraSvg";
import Parallax from "react-rellax";
import AuthContext from '../../context/AuthContext';
import axios from "../../axios/axios";
import { useNavigate,useParams } from "react-router-dom"
import { set } from "react-hook-form";

 

const navbarlinks = [
    { url: "", title: "Home" },
    { url: "", title: "Contact" },
    { url: "", title: "About  " },
];


const BookedPage = ({route}) => {

    const { currentUser } = useContext(AuthContext)
    const [cuser,setCuser]= useState(null)

    const bookingId = useParams()
    const BookingId = bookingId.bookingId



    useEffect(() => {
        
      

        const getUser = async () => {

            try {

                console.log('get user called in Landing page');

                const resp = await axios.get('/users/getOrderbyId?userId=' + BookingId);

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

            <Navbar navbarLinks={navbarlinks} />
            
            <BookedHero user={cuser}  imgSrc={coverpic} />

            <Parallax speed={-5}>
                <CameraSvg></CameraSvg>
            </Parallax>
      
            <RadialRed></RadialRed>

            <BookedSlider
            
                  title={"Camera"}/>
    
            <Footerpic></Footerpic>
        </div>

    );
};

export default BookedPage;
