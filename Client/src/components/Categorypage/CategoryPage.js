import { React,useContext,useEffect, useState}from "react";
import "../LandingPage/landingpage.css";
import "../Illustartions/RadialRed";
import coverpic from "../../assets/CategoryCamera.jpeg";
import s1 from "../../assets/s11.jpeg";
import s2 from "../../assets/s2.jpeg";
import s3 from "../../assets/s3.jpeg";
import CategoryHero from "./CategoryHero/CategoryHero";
import CategorySlider from "./CategorySlider/CategorySlider";
import Navbar from "../Navbar/Navbar";
import SmallRadialRed from "../Illustartions/SmallRadialRed";
import Footerpic from "../Footerpic/Footerpic";
import CameraSvg from "../Camerasvg/CameraSvg";
import Parallax from "react-rellax";
import AuthContext from '../../context/AuthContext';
import axios from "../../axios/axios";
import { useNavigate,useParams } from "react-router-dom"
import { set } from "react-hook-form";
import Helmet from "react-helmet"
import Footer from "../Footer/Footer";
 

const navbarlinks = [
    { url: "", title: "Home" },
    { url: "", title: "Contact" },
    { url: "", title: "About  " },
];


const CategoryPage = ({route}) => {

    const { currentUser } = useContext(AuthContext)
    const [cuser,setCuser]= useState(null)
    const [cat , setCat]= useState('')
    const categoryName = useParams()
    const catName = categoryName.categoryName



    useEffect(() => {
        
        setCat(catName)

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
    }, [currentUser,catName]);


    return (


        <div className="landing__page">

            <Navbar navbarLinks={navbarlinks} />
            <Helmet>
                <title> Categories  </title>
                <meta name="description" content="Choose devices from available category to rent out" />
            </Helmet>
            
            <CategoryHero user={cuser} title={cat}  imgSrc={coverpic} />

            <Parallax speed={-5}>
                <CameraSvg></CameraSvg>
            </Parallax>
      
            <SmallRadialRed></SmallRadialRed>

            <CategorySlider
            
                category={cat}  title={"Camera"}/>


            <Footerpic></Footerpic>
            <Footer></Footer>
        </div>

    );
};

export default CategoryPage;
