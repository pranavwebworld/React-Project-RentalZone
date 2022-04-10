import { React, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./userslider2.css";
import { useInView } from "react-intersection-observer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack } from "@mui/material";
import AuthContext from '../../../context/AuthContext';
import axios from "../../../axios/axios";
import moment from "moment"
const Slider = ({ imageSrc, title, subtitle, flipped }) => {
  const { ref, inView, entry } = useInView({
    threshold: 0.4,
  });
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext)

  const [products, setProducts] = useState()


  useEffect(() => {
    
  
    const Products = async () => {

      try {

        const resp = await axios.get('/users/getUserProducts/'+currentUser.aud);


        console.log(resp.data, "All User products");

        let foundProducts = resp.data

        console.log({ foundProducts });

        setProducts(foundProducts)

      } catch (error) {

        console.log(error);
      }
    };


    Products()


  }, [])




  const renderContent = () => {
    if (!flipped) {
      return (
        <>
          <Stack

            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}

            spacing={4}
            padding={2}
          >

            {products?.map((product, index) => (

              !product.Pending && product.product.inStock &&  <Card onClick = {() => {navigate("/productDetails/" + product?.product?._id)}} key={index} sx={{ width: "15rem", border: "solid 1px #ab1941" }}>
                <CardActionArea>
              <CardMedia
                className="Zoomi-In"
                component="img"
                height="240rem"
                width="18rem"
                image={product?.product?.Product_pic1}
                alt="green iguana"

              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product?.product?.productName}
                </Typography>
                <Typography variant="body2" fontSize="18px" color="red">
                  <span style={{ color: "grey", fontWeight: "200" }} > Return Date   </span>   <span style={{ fontWeight: "500" }}  >  {moment(product.endingDate).format("MMM DD,YYYY")}  </span>
                </Typography>
              </CardContent>
            </CardActionArea>
              </Card>
           
             
            ))}

          </Stack>
        </>
      );
    } else {
      return (
        <>
          <div className="slider__content">
            <h1 className="slider__title">{title}</h1>
            <p style={{ color: "white" }}>{subtitle}</p>
          </div>
          <img src={imageSrc} alt="Travel" className="slider__image" />
        </>
      );
    }
  };

  return (

    <div style={{ position: "relative" }} >

      <h1 style={{ color: "white", position: "absolute", top: "-2rem", left: "15rem", fontWeight: "900" }} > Rented Gears   </h1>

    <div  className={inView ? "slider slider--zoom" : "slider"} ref={ref}>
      {renderContent()}
    </div>

     </div >

  );
};

export default Slider;



