import { React, useState, useEffect } from "react";
import "./productSlider.css";
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
import ReactMapGL, { GeolocateControl, NavigationControl, Marker } from "react-map-gl"


const PSlider = ({ imageSrc, title, subtitle, flipped }) => {
    const [latitude, setlatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [map, setmap] = useState(false)
    const ariaLabel = { "aria-label": "description" };


    const [viewport, setViewport] = useState({

        latitude: latitude,
        longitude: longitude,
        zoom: 8,
        width: '100vw',
        height: '100vh'


    })




  

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

            enableHighAccuracy: true

        })

        function successLocation(position) {


            setlatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)

            console.log(latitude);
            console.log(longitude);

            setTimeout(() => { setmap(!map) }, 1000)
        }


        function errorLocation() {


            console.log('location not available');
        }

    }




    const [previewSource, setPreviewSource] = useState();
    const [fileInputState, setFileInputState] = useState("");
    const [fileInputState2, setFileInputState2] = useState("");
    const [fileInputState3, setFileInputState3] = useState("");
    const [selectedFile, setSelectedfile] = useState("");



    const previewFile = async (file) => {

        console.log('called previewfile');

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {

            // setPreviewSource(reader.result);

            // uploadImage(reader?.result)

        };
    };




    // const uploadImage = async (base64Img) => {
    //     console.log(base64Img);
    //     try {

    //         const vendorId = vendor?._id
    //         console.log({ vendorId });
    //         axios.post("/vendors/proPicUpload", { base64Img, vendorId }, { withCredentials: true });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };








    var loadFile = function (event) {
        const file = event.target.files[0];
        var image = document.getElementById("output");
        image.src = URL.createObjectURL(event.target.files[0]);
        previewFile(file);
    };









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

                    <h4 style={{ color: "lightgrey" }}> Select Category </h4>
                    <SelectComponent></SelectComponent>

                    <FormControl id="first-name" required>
                        <TextField
                            sx={{ input: { color: "white", fontSize: "20px" } }}
                            label="Product description"
                            variant="standard"
                            color="primary"
                            focused
                        />
                    </FormControl>

                    <FormControl id="email" required>
                        <TextField
                            sx={{ input: { color: "white", fontSize: "20px" } }}
                            label="Product details"
                            variant="standard"
                            color="primary"
                            focused
                        />
                    </FormControl>

                    <FormControl id="email" required>
                        <h4 style={{ color: "lightgrey" }}> Select Price /day </h4>
                        <Slider
                            defaultValue={0}
                            getAriaValueText={valuetext}
                            step={100}
                            marks
                            min={100}
                            max={1000}
                            valueLabelDisplay="auto"
                            aria-label="Select Price Range"
                        />
                    </FormControl>

                    <Button
                        size={"large"}
                        startIcon={<PublicTwoToneIcon />}
                        variant={"contained"}
                        color="success"

                        onClick={() => { getLocation() }}>

                        {map ? "Close map":"Add you Location"}

          </Button>

                    <button className="VendorButtons">Submit </button>




                    <div className="productImage" >
                        <div class="product-pic">
                            <label class="-label" for="file">
                                <span class="glyphicon glyphicon-camera"></span>
                                <span>Change Image</span>
                            </label>
                            <input id="file" name="proImage" type="file" onChange={loadFile} />
                            <img src={"https://image.shutterstock.com/image-vector/add-image-vector-icon-260nw-1042853482.jpg"} id="output" width="00" />
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


            <div style={{ width: "40rem", height: "40rem", position: 'absolute', top: "50rem", left: "40rem" }} >

                {map &&

                    <ReactMapGL


                        mapboxAccessToken={"pk.eyJ1IjoicHJhbmF2cmVudGFsem9uZSIsImEiOiJjbDE0eHY5aTQwMjRmM2ZvZ2Zla3M0dWIwIn0.cZo7ikRB-drAMy7YpnycKw"}
                        {...viewport}

                        mapStyle={"mapbox://styles/mapbox/streets-v9"}
                        onMove={(e) => setViewport(e.viewport)}
                    >


                        <GeolocateControl

                            trackUserLocation

                        > Track</GeolocateControl>

                        <NavigationControl />

                        <Marker longitude={longitude} latitude={latitude} anchor="bottom" >
                            <img src=" " />
                        </Marker>

                    </ReactMapGL>
                }

            </div>



        </>
    );
};

export default PSlider;
