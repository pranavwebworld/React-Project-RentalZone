import { React, useState, useEffect, useCallback } from "react";
import "./productSlider.css";
import marker from "../../../assets/iconMarker.png";
import { useInView } from "react-intersection-observer";
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
import { useNavigate } from "react-router";
import TextField from "@mui/material/TextField";
import PublicTwoToneIcon from "@mui/icons-material/PublicTwoTone";
import SelectComponent from "../../SelectComponent/SelectComponent";
import ReactMapGL, {
  GeolocateControl,
  NavigationControl,
  Marker,
} from "react-map-gl";
import axios from "../../../axios/axios";
import { makeStyles } from "@material-ui/core";
import { color } from "@chakra-ui/styled-system";
import { ClassNames } from "@emotion/react";
import "mapbox-gl/dist/mapbox-gl.css"
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles({
  root: {
    backgroundColor: "fff",
    color: "fff",
  },
});

const PSlider = ({ vendor }) => {
  const [latitude, setlatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [map, setmap] = useState(false);
  const ariaLabel = { "aria-label": "description" };

  const [viewport, setViewport] = useState({
    latitude: latitude,
    longitude: longitude,
    zoom: 3,
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
      setlatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);

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
  const [fileInputState, setFileInputState] = useState("");
  const [fileInputState2, setFileInputState2] = useState("");
  const [fileInputState3, setFileInputState3] = useState("");
  const [selectedFile, setSelectedfile] = useState("");

  //image 1

  const previewFile = async (file) => {
    console.log("called previewfile");

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      setPreviewSource(reader.result);
      // uploadImage(reader?.result)
      setImage1(reader?.result);
    };
  };

  const uploadImage = async (base64Img) => {
    console.log(base64Img);
    try {
      const vendorId = vendor?._id;
      console.log({ vendorId });
      axios.post(
        "/vendors/proPicUpload",
        { base64Img, vendorId },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  var loadFile = function (event) {
    const file = event.target.files[0];
    var image = document.getElementById("output");
    console.log(image);
    image.src = URL.createObjectURL(event.target.files[0]);
    previewFile(file);
  };

  //image 2

  const previewFile2 = async (file2) => {
    console.log("called previewfile");

    const reader2 = new FileReader();
    reader2.readAsDataURL(file2);
    reader2.onloadend = async () => {
      setPreviewSource2(reader2.result);
      // uploadImage2(reader2?.result)
      setImage2(reader2?.result);
    };
  };

  const uploadImage2 = async (base64Img) => {
    // console.log(base64Img);
    try {
      const vendorId = vendor?._id;
      console.log({ vendorId });
      axios.post(
        "/vendors/ProductPicUpload2",
        { base64Img, vendorId },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  var loadFile2 = function (e) {
    console.log("Loadfile 2 called");
    const file2 = e.target.files[0];
    var image2 = document.getElementById("output2");
    image2.src = URL.createObjectURL(e.target.files[0]);
    previewFile2(file2);
  };

  //image 3

  const previewFile3 = async (file3) => {
    console.log("called previewfile3");

    const reader3 = new FileReader();
    reader3.readAsDataURL(file3);
    reader3.onloadend = async () => {
      // setPreviewSource3(reader3.result);
      // uploadImage3(reader3?.result)
      setImage3(reader3?.result);
    };
  };

  const uploadImage3 = async (base64Img) => {
    // console.log(base64Img);
    try {
      const vendorId = vendor?._id;
      console.log({ vendorId });
      axios.post(
        "/vendors/ProductPicUpload3",
        { base64Img, vendorId },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  var loadFile3 = function (e) {
    console.log("Loadfile 2 called");
    const file3 = e.target.files[0];
    var image3 = document.getElementById("output3");
    image3.src = URL.createObjectURL(e.target.files[0]);
    previewFile3(file3);
  };

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


    if (productName &&
      productDesc&&
      rent&&
      category&&
      address&&
      latitude&&
      longitude&&
      cityName&&
      image1&&
      image2&&
      image3 !== null){


      setLoading(true)
      console.log(image1, image2, image3);
      const vendorId = vendor._id;
      console.log("submit handler called");


      try {

        axios.post("/vendors/productRegister", {

          productName,
          productDesc,
          rent,
          category,
          address,
          latitude,
          longitude,
          vendorId,
          cityName,
          image1,
          image2,
          image3,

        }).then((resp) => {

          if (resp) {

            setLoading(false)



            toast.success("Product Added")

            // setProductName('')
            // setProductDesc('')
            // setCategory('')
            // setRent('')
            // setAddress('')
            // setPincode('')
            // setCityName('')
            // setImage1('')
            // setImage2('')
            // setImage3('')
            // setLoading('')
          }
        }).catch((error) => {

          toast.error("Please Fill the Form ")


        })


      } catch (error) {

        console.log(error);

      }




      }else{





      console.log(
        productName,
        productDesc,
        rent,
        category,
        address,
        latitude,
        longitude,
        cityName,
      );

      toast.error("Please Fill The Form Completely ")

      return







      }




    

  };

  const getSelect = (value) => {
    console.log("select in child", value);

    setCategory(value);
  };


  

  const renderContent = () => {
    return (
      <>
        < ToastContainer className="toastMy"  theme='dark' position="top-left " />
        <Stack
          style={{ width: "30rem" }}
          direction="column"
          justifyContent="center"
          spacing={4}
          padding={5}
        >
          <h1 style={{ color: "lightgrey" }}> Register Product </h1>

          <SelectComponent getSelect={getSelect}></SelectComponent>

          <FormControl id="first-name" required>
            <TextField
              InputLabelProps={{
                style: { color: "#fff", fontSize: "25px" },
              }}
              style={{ color: "white" }}
              sx={{ input: { color: "white", fontSize: "20px" } }}
              label="Product Name"
              variant="standard"
              size="large"
              focused
              onChange={(e) => {
                setProductName(e.target.value);
              }}
            />
          </FormControl>

          <FormControl id="email" required>
            <TextField
              InputLabelProps={{
                style: { color: "#fff", fontSize: "25px" },
              }}
              sx={{ input: { color: "white", fontSize: "20px" } }}
              label="Product details"
              variant="standard"
              focused
              onChange={(e) => {
                setProductDesc(e.target.value);
              }}
            />
          </FormControl>

          <FormControl id="email" required>
            <TextField
              InputLabelProps={{
                style: { color: "#fff", fontSize: "25px" },
              }}
              sx={{ input: { color: "white", fontSize: "20px" } }}
              label=" Location Address"
              variant="standard"
              focused
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </FormControl>

          <FormControl id="email" required>
            <TextField
              InputLabelProps={{
                style: { color: "#fff", fontSize: "25px" },
              }}
              sx={{ input: { color: "white", fontSize: "20px" } }}
              label=" City Name"
              variant="standard"
              focused
              onChange={(e) => {
                setCityName(e.target.value);
              }}
            />
          </FormControl>

       

          <FormControl id="email" required>
            <h4 style={{ color: "white", fontSize: "22px" }}>
              {" "}
              Select Price /day{" "}
            </h4>

            <Slider
              InputLabelProps={{
                style: { color: "#fff", fontSize: "25px" },
              }}
              defaultValue={0}
              getAriaValueText={valuetext}
              step={100}
              marks
              min={100}
              max={1000}
              valueLabelDisplay="on"
              aria-label="Select Price Range"
              onChange={(e) => {
                setRent(e.target.value);
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
            {map ? "Close map" : "Add you Location"}
          </Button>

          {loading && <div class="spinner"> <span>  Please Wait </span>  </div>}

          {!loading && <Button onClick={submitHandler} variant={"contained"} color="success">
            Submit
          </Button>}

          
          <div className="vendorproductImage">
     
            <div class="vendorproduct-pic1">
              <label class="-label" for="file">
                <span class="glyphicon glyphicon-camera"></span>
                <span>Change Image</span>
              </label>
              <input
                id="file"
                name="proImage"
                type="file"
                onChange={loadFile}
              />
              <img
                src={
                  "https://image.shutterstock.com/image-vector/add-image-vector-icon-260nw-1042853482.jpg"
                }
                id="output"
                width="00"
              />
            </div>
          </div>


          <div className="vendorproductImage2">
            <div class="product-pic1">
              <label class="-label" for="file2">
                <span class="glyphicon glyphicon-camera"></span>
                <span>Change Image</span>
              </label>
              <input
                id="file2"
                name="proImage2"
                type="file"
                onChange={loadFile2}
              />
              <img
                src={
                  "https://image.shutterstock.com/image-vector/add-image-vector-icon-260nw-1042853482.jpg"
                }
                id="output2"
                width="00"
              />
            </div>
          </div>


          <div className="vendorproductImage3">
            <div class="product-pic1">
              <label class="-label" for="file3">
                <span class="glyphicon glyphicon-camera"></span>
                <span>Change Image</span>
              </label>
              <input
                id="file3"
                name="proImage3"
                type="file"
                onChange={loadFile3}
              />
              <img
                src={
                  "https://image.shutterstock.com/image-vector/add-image-vector-icon-260nw-1042853482.jpg"
                }
                id="output3"
                width="00"
              />
            </div>
          </div>
        </Stack>
      </>
    );
  };


  return (
    <>
      <div

    
        style={{ height: "40rem" }}
        className={inView ? "slider slider--zoom" : "slider"}
        ref={ref}
      >
        {renderContent()}
      </div>

      <div
        
        className="Map"
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
            <GeolocateControl trackUserLocation> Track</GeolocateControl>

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