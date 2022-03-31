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
import { Input, makeStyles } from "@material-ui/core";
import { color } from "@chakra-ui/styled-system";
import { ClassNames } from "@emotion/react";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { FullscreenControl } from "mapbox-gl";
import GlassCard from "../../GlassCard/GlassCard";

import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";

const useStyles = makeStyles({
  root: {
    backgroundColor: "fff",
    color: "fff",
  },
});

const PSlider = ({ user, product }) => {

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
    bgcolor: '#5b5a5a',
    border: '2px solid #000',
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
 

  const handleDate = (e)=>{

    console.log(e.target.value);

    const dates = e.target.value

    console.log({dates});


    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = dates[0]
    const secondDate =dates[1];

    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    const total=product.rent*diffDays
    console.log(diffDays);
    setTotalDays(diffDays)
    setTotal(total)


  }

  const renderContent = () => {
    return (
      <>
        <Stack
          style={{ width: "82rem" }}
          direction="column"
          justifyContent="center"
          spacing={8}
          padding={1}
        >
          <h1 style={{ color: "lightgrey", marginBottom: "20px" }}>
      
            Product Details
          </h1>

          <h3 style={{ color: "white", marginBottom: "-30px" }}>
            Product Name
          </h3>

          <FormControl id="first-name">
            <InputLabel style={{ color: "white" }} htmlFor="add">
              {product?.productName}
            </InputLabel>

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

          <h3 style={{ color: "white", marginBottom: "-30px" }}>
            Product Address
          </h3>
          <FormControl id="email">
            <InputLabel style={{ color: "white" }} htmlFor="add">
              {product?.address}
            </InputLabel>
            <TextField
              InputLabelProps={{
                style: { color: "#fff", fontSize: "25px" },
              }}
              sx={{ input: { color: "white", fontSize: "20px" } }}
              variant="standard"
              focused
            />
          </FormControl>

          <h3 style={{ color: "white", marginBottom: "-30px" }}>City Name</h3>
          <FormControl id="email">
            <InputLabel
              style={{ color: "white", fontSize: "15px" }}
              htmlFor="add"
            >
              {product?.cityName}
            </InputLabel>

            <TextField
              InputLabelProps={{
                style: { color: "#fff", fontSize: "25px" },
              }}
              sx={{ input: { color: "white", fontSize: "20px" } }}
              variant="standard"
              focused
            
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

    
            <Button
              onClick={handleOpen}
              variant={"contained"}
              color="success"
            >
              Book This device
            </Button>
       

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>


              <Typography id="modal-modal-title" variant="h6" component="h2">
               Total = Rs {total} <br></br> Todal days ={Days} 
          </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Please select required Dates 
          </Typography>
         
                <DateRangePickerComponent 

           
                min={minDate}
                
                placeholder=" ..... " 
                
                onChange={handleDate}
                
                ></DateRangePickerComponent>
      
            </Box>
          </Modal>



       
        </Stack>

        <Box>
          <GlassCard product={product}></GlassCard>
        </Box>
      </>
    );
  };

  return (
    <>
      <div
        style={{ width: "90rem", height: "40rem" }}
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
