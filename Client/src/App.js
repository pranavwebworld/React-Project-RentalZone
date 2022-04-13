import "./App.css";
import "../src/components/Illustartions/radialred.css";
import { BrowserRouter, Routes, Route, Navigate,Link } from "react-router-dom";
import Chat from "./components/Chat/Chat"
import LandingPage from "./components/LandingPage/LandingPage"
import UserPage from './components/userPage/UserPage'
import ProductRegister from "./components/ProductRegister/ProductPage" 
import ProductEditForm from "./components/ProductEditForm/ProductEditPage" 
import ProductDetailsPage from "./components/ProductDetails/ProductDetailsPage"
import CategoryPage from "./components/Categorypage/CategoryPage"
import BookedPage from "./components/BookedPage/BookedPage" 
import OrderPage from "./components/OrderPage/OrderPage"
import VideCallOrg from "./components/VideoCallOrg/VideoCallOrg"
import VideoCall from "./components/VideoCall/VideoCall";
import Calender from "./components/Calender/Calender";
import VendorSignupSignin from "./components/VendorSignup&SignIn/VendorSignup&Signin"
import SignupSignin from "./components/Signup&SignIn/Signup&Signin"
import Cookies from 'universal-cookie';
import React, { useContext } from "react";
import AuthContext from "./context/AuthContext";
import VendorContext from "./context/VendorContext"
import Helmet from "react-helmet"
import Videographer from "../src/components/VideographerSvg/Videographer";
import Wave from "../src/components/Wave/Wave";
import footerpic from "./components/Footerpic/Footerpic";
import Footer from "./components/Footer/Footer";

import VendorPage from "./components/VendorPage /vendorPage"

const cookies = new Cookies();

const removeCookie = () => {
  const cookies = new Cookies();
  cookies.set('userAccessToken', " ", { path: '/', expires: (new Date(Date.now())) });
}



function App() {


  const { loggedIn } = useContext(AuthContext);
  const { VloggedIn } = useContext(VendorContext);

  console.log({VloggedIn});
  console.log({loggedIn});


  return (

    <div className="App">

  
      <BrowserRouter>
     
     <Helmet>

    <title>  Rental Zone   </title>
    <meta name="description" content="Rentout your devices or book camera,lens,gymbals or other content creation equipments to rent out using our symbol UI "/>

     </Helmet>

        <Routes>
    
          <Route exact path="/logout" element={() => {  }} />
          
          <Route exact path="/user" element={loggedIn ? <UserPage /> : <Navigate to="/Signup" />}/>

          <Route exact path="chat" element={<Chat />} />

          <Route exact  path="chat/:vendorId" element={<Chat />} />

          <Route exact path="video" element={<VideCallOrg />} />

          <Route exact path="cal" element={<Calender />} />

          <Route exact path="/category/:categoryName" element={<CategoryPage />} />

          <Route exact path="/booked/:bookingId" element={<BookedPage />} />

          <Route exact path="/orders" element={<OrderPage />} />

          <Route exact path="/Signup" element={loggedIn ? <Navigate to="/user" /> : <SignupSignin />} />

          <Route exact path="/productDetails/:productId" element={<ProductDetailsPage />} />

          <Route exact path="/" element={<LandingPage />} />


          <Route exact path="/vendorSignup" element={VloggedIn ? <Navigate to="/vendor" /> :<VendorSignupSignin/>} />

          <Route exact path="/vendor" element={VloggedIn ? <VendorPage /> : <Navigate to="/vendorSignup" />} />

          <Route exact path="/ProductRegister" element={ <ProductRegister/> } />

          <Route exact path="/ProductEditRegister" element={<ProductEditForm /> } />


        </Routes>

      </BrowserRouter>


    </div>
  );
}

export default App;
