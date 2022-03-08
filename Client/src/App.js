import "./App.css";
import "../src/components/Illustartions/radialred.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./components/Chat/Chat"
import LandingPage from "./components/LandingPage/LandingPage"
import Videographer from "../src/components/VideographerSvg/Videographer";
import Wave from "../src/components/Wave/Wave";
import footerpic from "./components/Footerpic/Footerpic";
import Footer from "./components/Footer/Footer";


const navbarlinks = [
  { url: "", title: "Home" },
  { url: "", title: "Contact" },
  { url: "", title: "About  " },
];



function App() {
  return (
    <div className="App">

     
        <BrowserRouter>
        
          <Routes>

        <Route exact path="/" element={<LandingPage/>} />

         <Route exact path="chat"  element={<Chat/>}/>

          </Routes>
        
        </BrowserRouter>


    </div>
  );
}

export default App;
