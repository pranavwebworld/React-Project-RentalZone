import { Button, FormControl, FormLabel, Input } from "@mui/material";
import { React, useState } from "react";
import Stack from "@mui/material/Stack";

function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const submitHandler = () => {};
  return (


 

    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={5}
      padding={1}
    >
      <FormControl id="email" required>
        <FormLabel>Email</FormLabel>

        <Input
          style={{
            backgroundColor: "",
            borderRadius: "5px",
            textUnderlineOffset: "none",
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
        {" "}
        OTP Login{" "}
      </Button>




      
    </Stack>




  );
}

export default Login;
