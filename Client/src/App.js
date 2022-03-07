
import './App.css';
import "../src/components/Illustartions/radialred.css"
import coverpic from './assets/cover.jpeg'
import s1 from './assets/s11.jpeg'
import s2 from './assets/s2.jpeg'
import s3 from './assets/s3.jpeg'
import footerpic from "./components/Footerpic/Footerpic"
import Hero from './components/Hero/Hero'
import Slider from './components/Slider/Slider'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Button from "./components/Buttons/Button"
import RadialRed from "./components/Illustartions/RadialRed"

import CameraSvg from '../src/components/Camerasvg/CameraSvg'
import Videographer from "../src/components/VideographerSvg/Videographer"
import Parallax from 'react-rellax'
import Wave from '../src/components/Wave/Wave'
import Footerpic from './components/Footerpic/Footerpic';



const navbarlinks = [
  { url: "", title: "Home" },
  { url: "", title: "Contact" },
  { url: "", title: "About  " }
]

function App() {


  return (
    <div className="App">

      <Navbar navbarLinks={navbarlinks} />

      <Hero imgSrc={coverpic} />



      {/* 
      <Parallax speed={-5} >

        <Videographer></Videographer>
      </Parallax> */}

      <Parallax speed={-5}>
        <CameraSvg></CameraSvg>

      </Parallax>


      <Button></Button>

      <RadialRed></RadialRed>


      <Slider imageSrc={s1}
        title={'List Your Gear'}
        subtitle={'If you own a camera or any other photography ,videography gear, just list it with us through our simple product listing interface.'} />


      <Slider imageSrc={s2}
        title={'Safe and Secure'}
        subtitle={'We insure your product and all our customers are dually verified for address & identity.'}
        flipped={true} />
      <Slider imageSrc={s3}
        title={'24x7 Service '}
        subtitle={'You can book your product at any time,our service will be available for 24x7'}
      />
 
      <Footerpic></Footerpic>
    


    </div>
  );
}

export default App;
