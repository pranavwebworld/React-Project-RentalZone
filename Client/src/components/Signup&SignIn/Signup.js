import { Button, FormControl, FormLabel, Input } from "@mui/material";
import { React, useState } from "react";
import Stack from "@mui/material/Stack";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, csetPassword] = useState("");

  const submitHandler = () => {};
  return (
      
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      padding={1}
    >
          <FormControl id="first-name" required>
        <FormLabel>Name</FormLabel>

        <Input
          placeholder="Enter your name"
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
          placeholder="Enter your name"
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
        {" "}
        Submit{" "}
      </Button>
    </Stack>
  );
};

export default Signup;
