import { React, useContext, useEffect, useState } from "react";
import "./vendorPage.css";
import "../Illustartions/RadialRed";
import s1 from "../../assets/s11.jpeg";
import s2 from "../../assets/s2.jpeg";
import s3 from "../../assets/s3.jpeg";
import VendorHero from "./VendorHero/VendorHero";
import VendorSlider from "./VendorSlider/vendorSlider";
import VendorSlider2 from "./VendorSlider2/vendorSlider2"
import moment from "moment"

import VendorNavbar from "../VendorNavbar /VendorNavbar";
import VendorRadialRed from "../Illustartions/VendorRadialRed";
import Footerpic from "../Footerpic/Footerpic";
import CameraSvg from "../Camerasvg/CameraSvg";
import Parallax from "react-rellax";
import VendorContext from "../../context/VendorContext";
import coverpic from "../../assets/userPage3.jpg";
import axios from "../../axios/axios";
import "./vendorPage.css";
import Footer from "../Footer/Footer";






const VendorLandingPage = () => {

  const [orders, setOrder] = useState(null)
  const [Change, setChanged] = useState(true)

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

    const getVendorOrders = async () => {


      try {

        const resp = await axios.get('/vendors/getAllVendorOrders/' + currentVendor?.aud);

        console.log(resp.data, "   All Vendor Order");

        let VendorOrders = resp.data

        setOrder(VendorOrders)

        console.log(VendorOrders);

      } catch (error) {

        console.log(error);
      }
    };

    getVendorOrders()

  }, []);



  const change = ()=>{

    setChanged(!Change)

  console.log("Changed called");

  }


  return (
    <div className="vendorPage">

      <VendorNavbar />

      <VendorHero vendor={cvendor} imgSrc={coverpic} />

      <Parallax speed={-5}>
        <CameraSvg></CameraSvg>
      </Parallax>

      <VendorRadialRed></VendorRadialRed>
      
      <VendorSlider change={change}  orders={orders} />

      <VendorSlider2  Change={Change}  vendor={currentVendor}>  </VendorSlider2>
      <Footerpic></Footerpic>
      <Footer></Footer>
  


    </div>
  );
};

export default VendorLandingPage;
