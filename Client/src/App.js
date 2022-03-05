
import './App.css';
import coverpic from './assets/cover.jpeg'
import s1 from './assets/s11.jpeg'
import s2 from './assets/s2.jpeg'
import s3 from './assets/s3.jpeg'
import Hero from './components/Hero/Hero'
import Slider from './components/Slider/Slider'
function App() {

  return (
    <div className="App">

      

      <Hero imgSrc={coverpic} />

      <Slider imageSrc={s1} 
      title= {'List Your Gear'} 
        subtitle={'If you own a camera or any other photography ,videography gear, just list it with us through our simple product listing interface.'} />

      <Slider imageSrc={s2}
        title={'Safe and Secure'}
        subtitle={'We insure your product and all our customers are dually verified for address & identity.'}
        flipped={true}/>
      <Slider imageSrc={s3}
        title={'24x7 Service '}
        subtitle={'You can book your product at any time,our service will be available for 24x7'}
      />


    </div>
  );
}

export default App;
