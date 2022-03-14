import { Button, FormControl, FormLabel, Input } from "@mui/material";
import { React, useState, useContext  } from "react";
import Stack from "@mui/material/Stack";
import axios from '../../axios/axios';
import Cookies from 'universal-cookie';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router';
const cookies = new Cookies();
const Signup = () => {

  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, csetPassword] = useState("");
  const { getLoggedIn } = useContext(AuthContext)




  const submitHandler = () => {

    axios.post("/users/register",{
      email,
      password,
      name,
      mobile
    }).then( async (res) => {
        
        console.log(res.data);

        if (res.data.userAccessToken) {

          cookies.set('userAccessToken', res.data.userAccessToken, { path: '/' });
          
          console.log(cookies.get('userAccessToken'));
          await getLoggedIn()
          navigate('/user')

        }

      }).catch((err)=>{

        console.log(err.message);
        
      })

  };
  return (
      
    <Stack
      direction="column"
      justifyContent="center"

      spacing={2}
      padding={1}
    >
          <FormControl id="first-name" required>
        <FormLabel>Name</FormLabel>

        <Input
          placeholder="Enter your name"
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </FormControl>
          <FormControl id="email" required>
        <FormLabel>Email</FormLabel>

        <Input
          type="email"
          placeholder="Enter your Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>


      <FormControl id="mobile" required>
        <FormLabel>Mobile</FormLabel>

        <Input
        type="number"
          placeholder="Enter your mobile number"
          onChange={(e) => {
            setMobile(e.target.value);
          }}
        />
      </FormControl>

          <FormControl id="password" required>
        <FormLabel>Pasword</FormLabel>

        <Input
          placeholder="Enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </FormControl>

          <FormControl id="cpassword" required>
        <FormLabel>Confirm Password</FormLabel>

        <Input
          placeholder="Confirm your Password"
          onChange={(e) => {
            csetPassword(e.target.value);
          }}
        />
      </FormControl>

      <Button fullWidth onClick={submitHandler} variant={"contained"}>
          Submit
      </Button>
    </Stack>
  );
};

export default Signup;
