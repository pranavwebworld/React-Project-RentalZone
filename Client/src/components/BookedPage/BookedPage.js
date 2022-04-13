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
import SmallRadialRed from "../Illustartions/SmallRadialRed";
import Footerpic from "../Footerpic/Footerpic";
import CameraSvg from "../Camerasvg/CameraSvg";
import Parallax from "react-rellax";
import AuthContext from '../../context/AuthContext';
import axios from "../../axios/axios";
import { useNavigate,useParams } from "react-router-dom"
import { set } from "react-hook-form";
import Footer from "../Footer/Footer";
import Confetti from 'react-dom-confetti';

 

const navbarlinks = [
    { url: "", title: "Home" },
    { url: "", title: "Contact" },
    { url: "", title: "About  " },
];

const config = {
    angle: "179",
    spread: 360,
    startVelocity: "55",
    elementCount: 70,
    dragFriction: "0.21",
    duration: 3000,
    stagger: "7",
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};

const config2 = {
    angle: "79",
    spread: 160,
    startVelocity: "55",
    elementCount: 80,
    dragFriction: "0.21",
    duration: 6000,
    stagger: "7",
    width: "10px",
    height: "10px",
    perspective: "800px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};



const BookedPage = ({route}) => {

    const { currentUser } = useContext(AuthContext)
    const [order,setOrder]= useState(null)
    const [celeb, setCeleb] = useState(false)

    const bookingId = useParams()
    const BookingId = bookingId.bookingId



    useEffect(() => {
        

        const getOrder = async () => {

            try {

                console.log({BookingId});

                const resp = await axios.get('/users/getOrderbyId/' + bookingId.bookingId);

                console.log(resp.data, " Order Details");

                let Order = resp.data

                setOrder(Order)

                console.log(Order);
   
                
            } catch (error) {

                console.log(error);
            }
        };

        getOrder()

        setTimeout(()=>{setCeleb(true)})

    }, []);


    return (


        <div className="bookedpage">

            <Navbar navbarLinks={navbarlinks} />
            
            <BookedHero   imgSrc={coverpic} />

            <Parallax speed={-5}>
                <CameraSvg></CameraSvg>
            </Parallax>
      
            <Confetti active={celeb} config={config} />
            <Confetti active={celeb} config={config2} />

            <BookedSlider
            
               order={order}   title={"Camera"}/>
            <Footerpic></Footerpic>
            <Footer></Footer>
        </div>

    );
};

export default BookedPage;
