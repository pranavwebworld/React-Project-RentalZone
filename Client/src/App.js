import "./App.css";
import "../src/components/Illustartions/radialred.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Chat from "./components/Chat/Chat"
import LandingPage from "./components/LandingPage/LandingPage"
import UserPage from './components/userPage/UserPage'

import VideoCall from "./components/VideoCall/VideoCall";
import Calender from "./components/Calender/Calender";
import VendorSignupSignin from "./components/VendorSignup&SignIn/VendorSignup&Signin"
import SignupSignin from "./components/Signup&SignIn/Signup&Signin"
import Cookies from 'universal-cookie';
import React, { useContext } from "react";
import AuthContext from "./context/AuthContext";
import VendorContext from "./context/VendorContext"

import Videographer from "../src/components/VideographerSvg/Videographer";
import Wave from "../src/components/Wave/Wave";
import footerpic from "./components/Footerpic/Footerpic";
import Footer from "./components/Footer/Footer";

import VendorPage from "./components/VendorPage/vendorPage"

const cookies = new Cookies();

const removeCookie = () => {
  const cookies = new Cookies();
  cookies.set('userAccessToken', " ", { path: '/', expires: (new Date(Date.now())) });
}



function App() {


  const { loggedIn } = useContext(AuthContext);
  const { VloggedIn } = useContext(VendorContext);

  return (

    <div className="App">

  
      <BrowserRouter>

        <Routes>
    
          <Route exact path="/logout" element={() => {  }} />
          
          <Route exact path="/user" element={loggedIn ? <UserPage /> : <Navigate to="/Signup" />}/>

          <Route exact path="chat" element={<Chat />} />

          <Route exact path="video" element={<VideoCall />} />

          <Route exact path="cal" element={<Calender />} />

          <Route exact path="/Signup" element={loggedIn ? <Navigate to="/user" /> : <SignupSignin />} />



          <Route exact path="/" element={<LandingPage />} />


          <Route exact path="/vendorSignup" element={VloggedIn ? <Navigate to="/vendor" /> :<VendorSignupSignin/>} />

          <Route exact path="/vendor" element={VloggedIn ? <VendorPage /> : <Navigate to="/vendorSignup" />} />


        </Routes>

      </BrowserRouter>


    </div>
  );
}

export default App;
