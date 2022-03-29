import { React, useState, useEffect, useCallback } from "react";
import "./productSlider.css";
import marker from '../../../assets/iconMarker.png'
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
import { makeStyles } from "@material-ui/core"
import { color } from "@chakra-ui/styled-system";
import { ClassNames } from "@emotion/react";


import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const useStyles = makeStyles({

    root:{

        backgroundColor:"fff",
        color:"fff"

    }


})






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
    const [fileInputState, setFileInputState] = useState("");
    const [fileInputState2, setFileInputState2] = useState("");
    const [fileInputState3, setFileInputState3] = useState("");
    const [selectedFile, setSelectedfile] = useState("");

    const previewFile = async (file) => {
        console.log("called previewfile");

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            setPreviewSource(reader.result);
            uploadImage(reader?.result)
        };
    };

    const uploadImage = async (base64Img) => {
        console.log(base64Img);
        try {

            const vendorId = vendor?._id
            console.log({ vendorId });
            axios.post("/vendors/proPicUpload", { base64Img, vendorId }, { withCredentials: true });
        } catch (error) {
            console.log(error);
        }
    };

    var loadFile = function (event) {
        const file = event.target.files[0];
        var image = document.getElementById("output");
        image.src = URL.createObjectURL(event.target.files[0]);
        previewFile(file);
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
    
    const [avatar, setAvatar] = useState('https://res.cloudinary.com/deb6scajo/image/upload/v1640784817/avatars/sample_dp_luhfir.png');


    console.log({productName});
    console.log({productDesc});
    console.log({rent});
    console.log({category});
    console.log({address});
    console.log({pincode});
    console.log({latitude});
    console.log({longitude});



    const submitHandler = () => {
       const  vendorId=vendor._id
        console.log("submit handler called");
        axios.post("/vendors/productRegister", {  productName, productDesc, rent, category, address, pincode, latitude, longitude, vendorId,cityName});
    };



    const getSelect = (value) => {

        console.log("select in child", value);

        setCategory(value)

    }


    const renderContent = () => {
        return (
            <>
                <Stack
                    style={{ width: "30rem" }}
                    direction="column"
                    justifyContent="center"
                    spacing={5}
                    padding={1}
                >
                    <h1 style={{ color: "lightgrey" }}> Register Product </h1>

                 
                    <SelectComponent getSelect={getSelect}  ></SelectComponent>

                    <FormControl id="first-name" required>

                        <TextField
                            InputLabelProps={{
                                style: { color: '#fff', fontSize: "25px" },
                            }}
                            
                            style={{ color: 'white' }}
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
                                style: { color: '#fff', fontSize: "25px" },
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
                                style: { color: '#fff', fontSize: "25px" },
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
                                style: { color: '#fff', fontSize: "25px" },
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

                        <TextField
                            InputLabelProps={{
                                style: { color: '#fff',fontSize:"25px" },
                            }}
                            sx={{ input: { color: "white", fontSize: "20px" } }}
                            label=" Pin Code"
                            variant="standard"
                       
                            focused
                            onChange={(e) => {

                                setPincode(e.target.value);
                            }}
                        />
                    </FormControl>



                    <FormControl id="email" required>

                        <h4 style={{ color: "white", fontSize:"22px" }}> Select Price /day </h4>

                        <Slider
                            InputLabelProps={{
                                style: { color: '#fff', fontSize: "25px" },
                            }}
                            defaultValue={0}
                            getAriaValueText={valuetext}
                            step={100}
                            marks
                            min={100}
                            max={1000}
                            valueLabelDisplay="auto"
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


                    <Button onClick={submitHandler} variant={"contained"}  color="success">
                        Submit
                    </Button>


                    <div className="productImage">
                        <div class="product-pic1">
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
