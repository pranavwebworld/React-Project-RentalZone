import { Button, FormControl, FormLabel, Input } from "@mui/material";
import { React, useState, useContext  } from "react";
import Stack from "@mui/material/Stack";
import axios from '../../axios/axios';
import Cookies from 'universal-cookie';
import VendorContext from '../../context/VendorContext';
import { useNavigate } from 'react-router';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "./signuplogin.css"
const cookies = new Cookies();

const Signup = () => {

  const navigate = useNavigate()
  
  const { getVLoggedIn } = useContext(VendorContext)

  const [errormsg, setErrorMsg] = useState('')
  const handleSubmit = ({email,
    password,
    name,
    mobile}) => {

    axios.post("/vendors/register",{
      email,
      password,
      name,
      mobile
    }).then( async (res) => {
          
        console.log(res.data);

        if (res.data.vendorAccessToken) {

          cookies.set('vendorAccessToken', res.data.vendorAccessToken, { path: '/' });
          
          console.log(cookies.get('vendorAccessToken'));

          await getVLoggedIn()

          navigate('/vendor')

        } 

      if (res.data?.error) setErrorMsg(res.data?.error.message)
    

      }).catch((err)=>{


        console.log(err.message);
        
      })

  };


  const defaultValues = {
    email: "",
    password: "",
    mobile:"",
    name:""
  };


  const validationSchema = yup.object().shape({

    email: yup.string().required().email("Please enter a valid email"),

    name: yup.string().required(),

    password: yup.string().required("Password is required").min(2).max(10),

    mobile: yup.string().length(10).required(),
  });





  return (
      
    <Stack
      direction="column"
      justifyContent="center"

      spacing={2}
      padding={1}
    >


      <Formik
        initialValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Stack
            direction="column"
            justifyContent="center"
            spacing={2}
            padding={1}
          >
              

            <FormControl id="first-name" required>
              <FormLabel>name</FormLabel>

              <Field className="inputField" type="name" name="name" placeholder="Enter your name" />
              <p style={{ color: "darkred" }}>

                <ErrorMessage name="name" />{" "}
              </p>

            </FormControl>


            <FormControl id="first-name" required>
              <FormLabel>Email</FormLabel>


              <Field className="inputField" type="email" name="email" placeholder="Enter your Email" />
              <p style={{ color: "darkred" }}>

                <ErrorMessage name="email" />{" "}
              </p>

            </FormControl>

            <FormControl id="first-name" required>
              <FormLabel>Mobile</FormLabel>

              <Field className="inputField" type="text" name="mobile" placeholder="Enter your Mobile" />
              <p style={{ color: "darkred" }}>

                <ErrorMessage name="mobile" />{" "}
              </p>

            </FormControl>
            <FormControl id="email" required>
              <FormLabel>Password</FormLabel>

              <Field
                className="inputField"
                type="password"
                name="password"
                placeholder="Enter your pasword"
              />
              <p style={{ color: "darkred" }}>

                <ErrorMessage name="password" />
                {errormsg}  
              </p>

            </FormControl>

            <Button fullWidth type="submit" variant={"contained"}>
              Submit
            </Button>
          </Stack>


        </Form>
      </Formik>
    </Stack>
  );
};





export default Signup;
