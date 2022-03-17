import { Button, FormControl, FormLabel, Input } from "@mui/material";
import { React, useState,useContext } from "react";
import Stack from "@mui/material/Stack";
import axios from '../../axios/axios';
import Cookies from 'universal-cookie';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router';

const cookies = new Cookies();



function Login() {

  const navigate = useNavigate()
  const { getLoggedIn } = useContext(AuthContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = () => {

    axios.post("/vendors/login",{

      email,
      password
    },)
      .then( async (res) => {

        const responseData=res.data

        console.log({responseData});

        if (res.data.userAccessToken){
          cookies.set('vendorAccessToken', res.data.userAccessToken, { path: '/' });
          console.log(cookies.get('userAccessToken')); 
          await getLoggedIn()
          navigate('/vendor')
        }

      }).catch((err) => {

        console.log(err.message);

      })


  };
  return (


 

    <Stack
      direction="column"
      justifyContent="center"

      spacing={5}
      padding={1}
    >
      <FormControl id="email" required>
        <FormLabel>Email</FormLabel>

        <Input
          style={{
        
          }}
          type="email"
          placeholder="Enter your Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>

      <FormControl id="password" required>
        <FormLabel>Pasword</FormLabel>

        <Input
        type='password'
          placeholder="Enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </FormControl>

      <Button fullWidth onClick={submitHandler} variant={"contained"}>
        {" "}
        Submit{" "}
      </Button>
      <Button
        fullWidth
        onClick={submitHandler}
        color="secondary"
        variant={"outlined"}
      >
       
        OTP Login
      </Button>

      
    </Stack>

  );
}

export default Login;
