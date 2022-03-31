import { React, useState, useEffect, useCallback } from "react";
import "./productdetailslider.css";
import marker from "../../../assets/iconMarker.png";
import { useInView } from "react-intersection-observer";
import "mapbox-gl/dist/mapbox-gl.css"

import {
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { useNavigate, useParams  } from "react-router";
import TextField from "@mui/material/TextField";
import PublicTwoToneIcon from "@mui/icons-material/PublicTwoTone";
import SelectComponent from "../../SelectComponent/SelectComponent";
import ReactMapGL, {
  GeolocateControl,
  NavigationControl,
  Marker,
} from "react-map-gl";
import axios from "../../../axios/axios";
import { Input, makeStyles } from "@material-ui/core";
import { color } from "@chakra-ui/styled-system";
import { ClassNames } from "@emotion/react";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { FullscreenControl } from "mapbox-gl";

const useStyles = makeStyles({
  root: {
    backgroundColor: "fff",
    color: "fff",
  },
});

const PSlider = ({ user,product }) => {
  
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [map, setmap] = useState(false);
  const ariaLabel = { "aria-label": "description" };
  const navigate = useNavigate();




  const [viewport, setViewport] = useState({
    latitude: latitude,
    longitude:longitude,
    zoom: 4,
    width: "100vw",
    height: "100vh",
  });

  const { ref, inView, entry } = useInView({
    threshold: 0.2,
  });

  const marks = [
    {
      value: 100,
      label: "Rs",
    },
    {
      value: 200,
      label: "Rs",
    },
    {
      value: 300,
      label: "Rs",
    },
    {
      value: 400,
      label: "Rs",
    },
  ];

  function valuetext(value) {
    return `${value}RS`;
  }

  function getLocation() {
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
      enableHighAccuracy: true,
    });

    function successLocation(position) {

      setLatitude(product?.latitude);
      setLongitude(product.longitude);

      console.log(latitude);
      console.log(longitude);

      setTimeout(() => {
        setmap(!map);
      }, 1000);
    }

    function errorLocation() {
      console.log("location not available");
    }
  }

  const [previewSource, setPreviewSource] = useState();
  const [previewSource2, setPreviewSource2] = useState();



  

  const geolocateControlRef = useCallback(
    (ref) => {
      if (ref) {
        // Activate as soon as the control is loaded
        ref.trigger();
      }
    },
    [map]
  );


  const [productName, setProductName] = useState(null);
  const [productDesc, setProductDesc] = useState(null);
  const [category, setCategory] = useState(null);
  const [rent, setRent] = useState(null);
  const [address, setAddress] = useState(null);
  const [pincode, setPincode] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [loading, setLoading] = useState(false)




 


  console.log({ productName });
  console.log({ productDesc });
  console.log({ rent });
  console.log({ category });
  console.log({ address });
  console.log({ pincode });
  console.log({ latitude });
  console.log({ longitude });

  const submitHandler = () => {

 


    



  };

  const getSelect = (value) => {
    console.log("select in child", value);

    setCategory(value);
  };

  const renderContent = () => {
    return (
      <>
        <Stack
          style={{ width: "30rem" }}
          direction="column"
          justifyContent="center"
          spacing={6}
          padding={5}
        >

          <h1 style={{ color: "lightgrey",marginBottom:"20px" }}>  Product Details</h1>

         
          <h3 style={{ color: "white", marginBottom: "-30px"}} >Product Name</h3>

          <FormControl id="first-name" >

            <InputLabel style={{ color: 'white' }} htmlFor="add" >{product?.productName}</InputLabel>
                
            <TextField
              InputLabelProps={{
                style: { color: "#fff", fontSize: "25px" },
              }}
              style={{ color: "white" }}
              sx={{ input: { color: "white", fontSize: "20px" } }}
              
              variant="standard"
              size="large"
             
              focused
          
            />
          </FormControl>

     
          <h3 style={{ color: "white",marginBottom:"-30px" }} >Product Address</h3>
          <FormControl id="email" >
       
            <InputLabel style={{ color: 'white' }} htmlFor="add" >{product?.address}</InputLabel>
            <TextField
              InputLabelProps={{
                style: { color: "#fff", fontSize: "25px" },
              }}
              sx={{ input: { color: "white", fontSize: "20px" } }}
           
              variant="standard"
              focused
            
            />
          </FormControl>



          <h3 style={{ color: "white", marginBottom: "-30px" }} >City Name</h3>
          <FormControl id="email"> 
            
            <InputLabel style={{ color: 'white', fontSize: "15px", }} htmlFor="add" >{product?.cityName}</InputLabel>

            <TextField
              InputLabelProps={{
                style: { color: "#fff", fontSize: "25px" },
              }}
              sx={{ input: { color: "white", fontSize: "20px" } }}

              variant="standard"
              focused
              onChange={(e) => {
                setCityName(e.target.value);
              }}
            />
          </FormControl>


          <Button
            size={"large"}
            startIcon={<PublicTwoToneIcon />}
            variant={"contained"}
            className="VendorButtonsR"
            onClick={() => {
              getLocation();
            }}
          >
            {map ? "Close map" : "Show Location"}
          </Button>

          {loading && <div class="spinner"> <span>  Please Wait </span>  </div>}

          {!loading && <Button onClick={submitHandler} variant={"contained"} color="success">
           Book This device
          </Button>}


        
          
        </Stack>
      </>
    );
  };




  return (
    <>

      <div
        style={{ width: "70rem", height: "40rem" }}
        className={inView ? "slider slider--zoom" : "slider"}
        ref={ref}
      >
        {renderContent()}
      </div>

      <div
        style={{
          width: "20rem",
          height: "20rem",
          position: "absolute",
          top: "82rem",
          left: "40rem",
        }}
      >
        {map && (
          <ReactMapGL
            style={{ zIndex: "1000" }}
            mapboxAccessToken={
              "pk.eyJ1IjoicHJhbmF2cmVudGFsem9uZSIsImEiOiJjbDE0eHY5aTQwMjRmM2ZvZ2Zla3M0dWIwIn0.cZo7ikRB-drAMy7YpnycKw"
            }
            {...viewport}
            mapStyle={"mapbox://styles/mapbox/streets-v9"}
            onMove={(e) => setViewport(e.viewport)}
            ref={() => geolocateControlRef}
          >
            <GeolocateControl trackUserLocation> </GeolocateControl>

            <NavigationControl />
    

            <Marker longitude={longitude} latitude={latitude}>

              <img src={marker} />
            </Marker>
          </ReactMapGL>
        )}
      </div>


    </>
  );
};

export default PSlider;