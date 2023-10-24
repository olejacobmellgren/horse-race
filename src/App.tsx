import { CSSProperties } from 'react';
import ReactTyped from "react-typed";
import Horse from './components/Horse';
import { useState, useRef } from 'react';
import OkonomiTor from './assets/OkonomiTor.png';
import Bergen from './assets/Bergen.png';
import Aas from './assets/Aas.png';
import Spidermann from './assets/Spidermann.png';
import error from './assets/error.png';
import Confetti from 'react-confetti'

function App() {
  interface HorseProps {
    imgPath: string;
    style: CSSProperties;
    id: string;
  }

  const [startVisible, setStartVisible] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [complete, setComplete] = useState(false);
  const [message, setMessage] = useState('');
  const [horses, setHorses] = useState<{ [id: string]: HorseProps }>({
    "Tor": {
      imgPath: OkonomiTor,
      style: { 
        left: 'calc(1 * (100vw - 250px) / 5)', 
        transition: '1s',
        width: '15vw',
        height: '15vw' },      
      id: 'Tor'
    },
    "Bergen_Maskot": {
      imgPath: Bergen,
      style: { 
        left: 'calc(2 * (100vw - 250px) / 5)', 
        transition: '1s',
        width: '15vw',
        height: '15vw' },
      id: 'Bergen_Maskot'
    },
    "Aas_Maskot": {
      imgPath: Aas,
      style: { 
        left: 'calc(3 * (100vw - 250px) / 5)', 
        transition: '1s',
        width: '15vw',
        height: '15vw' },      
      id: 'Aas_Maskot'
    },
    "Spiderman": {
      imgPath: Spidermann,
      style: { 
        left: 'calc(4 * (100vw - 250px) / 5)', 
        transition: '1s',
        width: '15vw',
        height: '15vw' },      
      id: 'Spiderman'
    }
  });
  const horseRef = useRef(horses)
  horseRef.current = horses

  const resetHorses = {
    "Tor": { ...horses.Tor, style: { ...horses.Tor.style, left: 'calc(1 * (100vw - 250px) / 5)', top: 'calc(100vh/2 - 240px/2)', transition: '1s' } },
    "Bergen_Maskot": { ...horses.Bergen_Maskot, style: { ...horses.Bergen_Maskot.style, left: 'calc(2 * (100vw - 250px) / 5)', top: 'calc(100vh/2 - 240px/2)', transition: '1s' } },
    "Aas_Maskot": { ...horses.Aas_Maskot, style: { ...horses.Aas_Maskot.style, left: 'calc(3 * (100vw - 250px) / 5)', top: 'calc(100vh/2 - 240px/2)', transition: '1s' } },
    "Spiderman": { ...horses.Spiderman, style: { ...horses.Spiderman.style, left: 'calc(4 * (100vw - 250px) / 5)', top: 'calc(100vh/2 - 240px/2)', transition: '1s' } }
  }

  function handleStartVisible() {
    setComplete(false);
    setHorses(resetHorses);
    setStartVisible(!startVisible);
    setMessageVisible(false);
  }

  function handleMessageVisible(horseName: string, messageType: string) {
    setMessageVisible(true)
    if (messageType === "error") {
      setMessage(`${horseName} ERROR`)
    } else if (messageType === "finish") {
      setMessage(`${horseName} IS THE WINNER!!!`)
    }
  }
  
  function handleStart() {
    handleStartVisible();
    //set horses to start position
    let currentX = [0, 0, 0, 0];
    const startHorses = {
      "Tor": { ...horses.Tor, imgPath: OkonomiTor, style: { ...horses.Tor.style, left: currentX[0], top: '0vh' } },
      "Bergen_Maskot": { ...horses.Bergen_Maskot, imgPath: Bergen, style: { ...horses.Bergen_Maskot.style, left: currentX[1], top: '20vh' } },
      "Aas_Maskot": { ...horses.Aas_Maskot,  imgPath: Aas, style: { ...horses.Aas_Maskot.style, left: currentX[2], top: '40vh' } },
      "Spiderman": { ...horses.Spiderman, imgPath: Spidermann, style:  { ...horses.Spiderman.style, left: currentX[3], top: '60vh' } }
    }


    setHorses(startHorses)
    horseRef.current = startHorses;
    


    function moveHorse() {
      
      const randomHorseIndex = Math.floor(Math.random() * 4);
      const randomSpeed = Math.random() * 5 + 1;
      const randomHorse = Object.keys(horses)[randomHorseIndex];
      const randomRestart = Math.floor(Math.random() * 15);
      currentX[randomHorseIndex] += 7;
      setTimeout(() => {
        const test = { ...horseRef.current }
        if (randomRestart === 0) {
          test[randomHorse] = { ...test[randomHorse], 
            imgPath: error,
            style: { ...test[randomHorse].style, left: (0 + 'vw') , width: '10vw', height: '10vw', transition: (0.5).toString() + 's'} }
          currentX[randomHorseIndex] = 0;
          handleMessageVisible(randomHorse, "error")
        } else {
          test[randomHorse] = { ...test[randomHorse], 
            imgPath: horses[randomHorse].imgPath,
            style: { ...test[randomHorse].style, left: (currentX[randomHorseIndex].toString() + 'vw') , width: '15vw', height: '15vw', transition: (randomSpeed).toString() + 's'} }
        }
        setHorses(test)
        horseRef.current = test
        if (currentX[randomHorseIndex] <= 80) { // not finished
          moveHorse()
        } 
        else {

          setComplete(true);
          handleMessageVisible(randomHorse, "finish");
        }
      }, 800); // Adjust the delay as needed (in milliseconds)

    }
    moveHorse();
  }

  return (
    <>
      {complete ? (
        <Confetti />
      ): null}
      <div className="horse-container">
        {Object.values(horses).map((horse) => (<Horse id={horse.id} imgPath={horse.imgPath} style={horse.style} />))}
      </div>
      {startVisible && (
        <h1>
          <ReactTyped
            strings={["GAME INITIATED", "STARTING IN:", "5", "4", "3", "2", "1", "GO!"]}
            typeSpeed={40}
            onComplete={handleStart}
          />
        </h1>
      )}
      {messageVisible && (
        <h1 id="comment">
          <ReactTyped
            strings={[message]}
            typeSpeed={80}
            onComplete={() => setMessageVisible(complete)}
          />
        </h1>
      )}
      <div className="button-wrapper">
        {complete ? (
          <button onClick={handleStartVisible}>
            Start race
          </button>
        ): null}
      </div>
    
    </>
  )
}

export default App
