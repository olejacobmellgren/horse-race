import './App.css';
import ReactTyped from "react-typed";
import Horse from './components/Horse';
import { useEffect, useState } from 'react';
import OkonomiTor from './assets/OkonomiTor.png';
import Bergen from './assets/Bergen.png';
import Aas from './assets/Aas.png';
import Spidermann from './assets/Spidermann.png';

function App() {
  const [isVisible, setIsVisible] = useState(false);

  function handleStart() {
    setIsVisible(!isVisible);
  }



  return (
    <>
      <Horse imgPath={OkonomiTor} selftop={10}/>
      <Horse imgPath={Bergen} selftop={20}/>
      <Horse imgPath={Aas} selftop={30}/>
      <Horse imgPath={Spidermann} selftop={40}/>
      {isVisible && (<h1><ReactTyped strings={["GAME INITIATED STARTING IN:", "5" ,"4" ,"3", "2", "1", "GO!"]} typeSpeed={50} showCursor={false} onComplete={handleStart}/></h1>) }
      <div className="ButtonWrapper">
        <button onClick={handleStart}>
          Start race
        </button>
      </div>

     
    </>
  )
}

export default App
