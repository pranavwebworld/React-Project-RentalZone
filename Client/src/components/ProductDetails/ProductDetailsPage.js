import { React, useContext, useEffect, useState } from "react";
import "../LandingPage/landingpage.css";
import "../Illustartions/RadialRed";
import s1 from "../../assets/s11.jpeg";
import s2 from "../../assets/s2.jpeg";
import s3 from "../../assets/s3.jpeg";
import ProductDetailsHero from "./ProductDetailsHero/ProductDetailsHero";
import ProductDetailsSlider from "./ProductDetailsSlider/ProductDetailSlider";

import Navbar from "../Navbar/Navbar";
import RadialRed from "../Illustartions/RadialRed";
import Footerpic from "../Footerpic/Footerpic";
import CameraSvg from "../Camerasvg/CameraSvg";
import Parallax from "react-rellax";
import AuthContext from "../../context/AuthContext";
import coverpic from "../../assets/product_page.jpeg";
import axios from "../../axios/axios";
import "./productdetailspage.css";
import Helmet from "react-helmet"
import { useNavigate,useParams } from "react-router-dom"
import Footer from "../Footer/Footer";


const navbarlinks = [
  { url: "", title: "Home" },
  { url: "", title: "Contact" },
  { url: "", title: "About  " },
];



const ProductDetailsPage= () => {

  const { currentUser } = useContext(AuthContext);
  const [cvendor, setCvendor] = useState(null);
  const [productId, setproductId] = useState(null);
  const [product, setProduct] = useState(null);
  const ProductId= useParams()
  let PRODUCTID = ProductId?.productId

  // useEffect(() => {
    
  //   console.log(PRODUCTID, "Product Id ");

  //   setproductId(PRODUCTID)

  // }, [])


  useEffect(() => {

    const Products = async () => {

      try {

        const resp = await axios.get('/users/getProductById/' + ProductId?.productId);

        console.log(resp.data, "All products");

        let foundProduct = resp.data

        console.log({ foundProduct });

        setProduct(foundProduct)

      } catch (error) {

        console.log(error);
      }
    };

    Products();

  }, [])





  return (
    <div className="productDetails">

      <Navbar navbarLinks={navbarlinks} />

      <Helmet>

      <title> {`Product-${product?.productName}`} </title>
    
      <meta name="description" content={`Product-${product?.productDesc}`} />

      </Helmet>

      <ProductDetailsHero vendor={cvendor} imgSrc={coverpic} />

      <Parallax speed={-5}>

        <CameraSvg></CameraSvg>

      </Parallax>

      <RadialRed></RadialRed>
  
      < ProductDetailsSlider product={product} user={currentUser} title={"Camera"} />
      {/* <Footerpic></Footerpic>
      <Footer></Footer>
  */}
 
    </div>
  );
};


export default ProductDetailsPage;
