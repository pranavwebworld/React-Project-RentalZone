import React from "react";
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
import SelectComponent from "../../SelectComponent/SelectComponent"

const ariaLabel = { "aria-label": "description" };

const PSlider = ({ imageSrc, title, subtitle, flipped }) => {
  const navigate = useNavigate();

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
              label="Standard warning"
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
          >
            Add Your Location
          </Button>

          <button className="VendorButtons">Submit </button>
        </Stack>
      </>
    );
  };


  return (
    <div
      style={{ width: "70rem", height: "40rem" }}
      className={inView ? "slider slider--zoom" : "slider"}
      ref={ref}
    >
      {renderContent()}
    </div>
  );
};

export default PSlider;
