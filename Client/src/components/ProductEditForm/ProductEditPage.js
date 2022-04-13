import { React, useContext, useEffect, useState } from "react";
import "../LandingPage/landingpage.css";
import "../Illustartions/RadialRed";
import s1 from "../../assets/s11.jpeg";
import s2 from "../../assets/s2.jpeg";
import s3 from "../../assets/s3.jpeg";
import ProductEditHero from "./ProductEditHero/ProductEditHero";
import ProductEditSlider from "./ProductEditSlider/ProductEditSlider";
import { Link , useLocation } from "react-router-dom";
import { useNavigate } from "react-router";

import VendorNavbar from "../VendorNavbar /VendorNavbar";
import RadialRed from "../Illustartions/RadialRed";
import Footerpic from "../Footerpic/Footerpic";
import CameraSvg from "../Camerasvg/CameraSvg";
import Parallax from "react-rellax";
import VendorContext from "../../context/VendorContext";
import coverpic from "../../assets/product_page.jpeg";
import axios from "../../axios/axios";
import "./productEditPage.css";
import Footer from "../Footer/Footer";



const navbarlinks = [
  { url: "", title: "Home" },
  { url: "", title: "Contact" },
  { url: "", title: "About  " },
];

const ProductRegisterPage= () => {
  const { currentVendor } = useContext(VendorContext);
  const [cvendor, setCvendor] = useState(null);
  const location = useLocation()
  const product = location.state

  console.log(product);


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

      <VendorNavbar navbarLinks={navbarlinks} />

      <ProductEditHero vendor={cvendor} imgSrc={coverpic} />

      <Parallax speed={-5}>

        <CameraSvg></CameraSvg>

      </Parallax>

      <RadialRed></RadialRed>

      <ProductEditSlider productDetails={product} vendor={cvendor} title={"Camera"} />

      <Footerpic></Footerpic>
      <Footer></Footer>

    </div>
  );
};

export default ProductRegisterPage;
