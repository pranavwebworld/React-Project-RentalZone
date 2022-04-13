import { React,useContext,useEffect, useState}from "react";
import "../OrderPage/orderpage.css";
import "../Illustartions/RadialRed";
import coverpic from "../../assets/CategoryCamera.jpeg";
import s1 from "../../assets/s11.jpeg";
import s2 from "../../assets/s2.jpeg";
import s3 from "../../assets/s3.jpeg";
import OrderHero from "./OrderHero/OrderHero";
import OrderSlider from "./OrderSlider/OrderSlider";
import Navbar from "../Navbar/Navbar";
import RadialRed from "../Illustartions/RadialRed";
import Footerpic from "../Footerpic/Footerpic";
import CameraSvg from "../Camerasvg/CameraSvg";
import Parallax from "react-rellax";
import AuthContext from '../../context/AuthContext';
import axios from "../../axios/axios";
import { useNavigate,useParams } from "react-router-dom"
import { set } from "react-hook-form";
import Footer from "../Footer/Footer";

 


const OrderPage = ({route}) => {


    const { currentUser } = useContext(AuthContext)
    const [user,setUser]= useState()
 
    const [orders,setOrder]= useState(null)
    
    console.log({currentUser});


    useEffect(() => {

        setUser(currentUser?.aud)
        const getOrder = async () => {

            try {

                const resp = await axios.get('/users/getAllOrders/' + currentUser?.aud  );

                console.log(resp.data, " AllOrder Details");

                let Orders = resp.data

                setOrder(Orders)

                console.log(Orders);
   
            } catch (error) {

                console.log(error);
            }
        };

        getOrder()

    }, [currentUser]);



    return (


        <div className="landing__page">

            <Navbar  />
            
            <OrderHero  imgSrc={coverpic} />

            <Footer></Footer>
            <Parallax speed={-5}>
                <CameraSvg></CameraSvg>
            </Parallax>
      
            <RadialRed></RadialRed>

            <OrderSlider
            
               orders={orders}   title={"Camera"}/>
            <Footer></Footer>
        </div>
    );
};

export default OrderPage;
