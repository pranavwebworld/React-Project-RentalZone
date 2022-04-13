import  React ,{ useState, useEffect, useCallback } from "react";

import "./productdetailslider.css";
import marker from "../../../assets/iconMarker.png";
import { useInView } from "react-intersection-observer";
import "mapbox-gl/dist/mapbox-gl.css";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { useNavigate, useParams } from "react-router";
import TextField from "@mui/material/TextField";
import PublicTwoToneIcon from "@mui/icons-material/PublicTwoTone";
import SelectComponent from "../../SelectComponent/SelectComponent";

import ReactMapGL, {
  GeolocateControl,
  NavigationControl,
  Marker,
} from "react-map-gl";
import axios from "../../../axios/axios";
import { Input} from "@material-ui/core";
import { color } from "@chakra-ui/styled-system";
import { ClassNames } from "@emotion/react";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { FullscreenControl } from "mapbox-gl";
import GlassCard from "../../GlassCard/GlassCard";


import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";


import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  ChatButton: {
    color: 'white',
    [theme.breakpoints.only("sm")]: {
      display: "none",
    },
  }
}));



const PSlider = ({ user, product }) => {

  const classes = useStyles();

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [map, setmap] = useState(false);
  const ariaLabel = { "aria-label": "description" };
  const navigate = useNavigate();

  const [viewport, setViewport] = useState({
    latitude: latitude,
    longitude: longitude,
    zoom: 4,
    width: "100vw",
    height: "100vh",
  });

  const { ref, inView, entry } = useInView({
    threshold: 0.2,
  });

  
  function getLocation() {
    console.log("get geo called");
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

  const geolocateControlRef = useCallback(
    (ref) => {
      if (ref) {
        // Activate as soon as the control is loaded
        ref.trigger();
      }
    },
    [map]
  );

  
  const style = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'black',
    border: '1px solid #ab1941',
    boxShadow: 24,
    p: 4,
    color:"white"
    
  };



  const minDate = new Date();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [total ,setTotal ]= useState(0)
  const [Days, setTotalDays] = useState(0)
  const [Booked, setBooked] = useState(false)
  const [startingDate, setStartingDate] = useState(0)
  const [endingDate, setEndingDate] = useState(0)
 

  const handleDate = (e)=>{


    console.log(e.target.value);
    const dates = e.target.value
    console.log({dates});

    const oneDay = 24 * 60 * 60 * 1000; 
    const firstDate = dates[0]
    const secondDate =dates[1];
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    setStartingDate(firstDate)
    setEndingDate(secondDate)


    const total=product.rent*diffDays
    console.log(diffDays);
    setTotalDays(diffDays)
    setTotal(total)
    setBooked(true)

  }

  const submitHandler = () => {
    handleClose()

    const userId = user.aud;

    console.log("  Booking submit handler called");

    try {

      axios.post("/users/order", {

        product,
        userId,
        total,
        Days,
        startingDate,
        endingDate
        
      }).then((resp) => {

        if (resp) {

          console.log(resp);
          console.log(resp?.data?._id);
          navigate("/booked/"+resp?.data?._id)

        }
      })

    } catch (error) {

      console.log(error);

    }

  };


  const renderContent = () => {
    return (
      <>
        <Stack


        width={{lg:"82rem", xs:"22rem",sm:"22rem"}}
         
          direction={{ xs: 'column', sm: 'column' }}
          spacing={6}
          padding={1}
        >
          <h1 style={{ color: "lightgrey", marginBottom: "20px" }}>
      
            Product Details
          </h1>

          <h3 style={{ color: "white", marginBottom: "-30px" }}>
            Product Name
          </h3>
          <FormControl
          
        
          id="first-name">
            {/* <InputLabel style={{ color: "white" }} htmlFor="add">
              {product?.productName}
            </InputLabel> */}

            <TextField
              InputLabelProps={{
                style: { color: "#fff", fontSize: "25px" },
              }}
              style={{ color: "white" }}
              sx={{ input: { color: "white", fontSize: "20px" } }}
              variant="standard"
              size="large"
              focused
              value={product?.productName}
            />
          </FormControl>

          <h3 style={{ color: "white", marginBottom: "-30px" }}>
            Product Address
          </h3>
            <FormControl id="email"


          >
            {/* <InputLabel style={{ color: "white" }} htmlFor="add">
             
            </InputLabel> */}
            <TextField
              InputLabelProps={{
                style: { color: "#fff", fontSize: "25px" },
              }}
              sx={{ input: { color: "white", fontSize: "20px" } }}
              variant="standard"
              focused
              value={product?.address}
            />
          </FormControl>

          <h3 style={{ color: "white", marginBottom: "-30px" }}>City Name</h3>
          <FormControl id="email">
            {/* <InputLabel
              style={{ color: "white", fontSize: "15px" }}
              htmlFor="add"
            >
            
            </InputLabel> */}

            <TextField
              InputLabelProps={{
                style: { color: "#fff", fontSize: "25px" },
              }}
              sx={{ input: { color: "white", fontSize: "20px" } }}
              variant="standard"
              focused
               value={product?.cityName}
            
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


          {user && <Button
            onClick={handleOpen}
            variant={"contained"}
            color="success"
          >
            Book This device
            </Button>  }
           
       
          <Modal
            
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box style={{borderRadius:"10px"}}  sx={style}>


              <Typography id="modal-modal-title" variant="h6" component="h2">
                Total = ₹  {total} <br></br>  Days = {Days}
          </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Please select required Dates 
          </Typography>
         
                <DateRangePickerComponent 
           
                min={minDate}
                
                placeholder=" ..... " 
                
                onChange={handleDate}

                style={{color:"white"}}
                
                ></DateRangePickerComponent>


              {Booked && <Button style={{ marginTop: "5px", float: "right" }} onClick={submitHandler} variant={"contained"} color="success">
            Submit
          </Button>}
    
            </Box>
          </Modal>
        </Stack>

        <Stack 

          className={"glassComponent"}
        direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }} 
          
          lg={{ width: "82rem" }}
          sm={{ width: "42rem" }}
          xs={{ width: "42rem" }}
        >
          <Box>
            <GlassCard user={user} product={product}></GlassCard>
          </Box>


          </Stack>
      
      </>
    );
  };

  return (
    <>
      <div
      
        className={inView ? "userslider userslider--zoom" : "userslider"}
        ref={ref}
      >
        {renderContent()}
      </div>

      <div
        style={{
          width: "20rem",
          height: "20rem",
          position: "absolute",
          left: "2rem",
           top: "90rem"
        
        }}
      >
        {map && (
          <ReactMapGL
            
            style={{ zIndex:"1008",position:"absolute", }}
            
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
