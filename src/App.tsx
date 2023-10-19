import { CSSProperties } from 'react';
import ReactTyped from "react-typed";
import Horse from './components/Horse';
import { useState, useRef } from 'react';
import OkonomiTor from './assets/OkonomiTor.png';
import Bergen from './assets/Bergen.png';
import Aas from './assets/Aas.png';
import Spidermann from './assets/Spidermann.png';
import error from './assets/error.png';

function App() {
  interface HorseProps {
    imgPath: string;
    style: CSSProperties;
    id: string;
  }

  const [startVisible, setStartVisible] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [onCompleteRemove, setOnCompleteRemove] = useState(false);
  const [message, setMessage] = useState('');
  const [horses, setHorses] = useState<{ [id: string]: HorseProps }>({
    "tor": {
      imgPath: OkonomiTor,
      style: { left: 'calc(1 * (100vw - 250px) / 5)', transition: '1s' },
      id: 'tor'
    },
    "bergen": {
      imgPath: Bergen,
      style: { left: 'calc(2 * (100vw - 250px) / 5)', transition: '1s' },
      id: 'bergen'
    },
    "aas": {
      imgPath: Aas,
      style: { left: 'calc(3 * (100vw - 250px) / 5)', transition: '1s' },
      id: 'aas'
    },
    "spider": {
      imgPath: Spidermann,
      style: { left: 'calc(4 * (100vw - 250px) / 5)', transition: '1s' },
      id: 'spider'
    }
  });
  const horseRef = useRef(horses)
  horseRef.current = horses

  const resetHorses = {
    "tor": { ...horses.tor, style: { ...horses.tor.style, left: 'calc(1 * (100vw - 250px) / 5)', top: 'calc(100vh/2 - 240px/2)', transition: '1s' } },
    "bergen": { ...horses.bergen, style: { ...horses.bergen.style, left: 'calc(2 * (100vw - 250px) / 5)', top: 'calc(100vh/2 - 240px/2)', transition: '1s' } },
    "aas": { ...horses.aas, style: { ...horses.aas.style, left: 'calc(3 * (100vw - 250px) / 5)', top: 'calc(100vh/2 - 240px/2)', transition: '1s' } },
    "spider": { ...horses.spider, style: { ...horses.spider.style, left: 'calc(4 * (100vw - 250px) / 5)', top: 'calc(100vh/2 - 240px/2)', transition: '1s' } }
  }

  function handleStartVisible() {
    setHorses(resetHorses)
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
      "tor": { ...horses.tor, style: { ...horses.tor.style, left: currentX[0], top: '0vh' } },
      "bergen": { ...horses.bergen, style: { ...horses.bergen.style, left: currentX[1], top: '20vh' } },
      "aas": { ...horses.aas, style: { ...horses.aas.style, left: currentX[2], top: '40vh' } },
      "spider": { ...horses.spider, style: { ...horses.spider.style, left: currentX[3], top: '60vh' } }
    }


    setHorses(startHorses)
    horseRef.current = startHorses;
    


    function moveHorse() {
      
      const randomHorseIndex = Math.floor(Math.random() * 4);
      const randomSpeed = Math.random() * 5 + 1;
      const randomHorse = Object.keys(horses)[randomHorseIndex];
      const randomRestart = Math.floor(Math.random() * 20);
      currentX[randomHorseIndex] += 7;
      setTimeout(() => {
        const test = { ...horseRef.current }
        if (randomRestart === 0) {
          test[randomHorse] = { ...test[randomHorse], 
            imgPath: error,
            style: { ...test[randomHorse].style, left: (0 + 'vw') , transition: (0.5).toString() + 's'} }
          currentX[randomHorseIndex] = 0;
          handleMessageVisible(randomHorse, "error")
        } else {
          test[randomHorse] = { ...test[randomHorse], 
            imgPath: horses[randomHorse].imgPath,
            style: { ...test[randomHorse].style, left: (currentX[randomHorseIndex].toString() + 'vw') , transition: (randomSpeed).toString() + 's'} }
        }
        setHorses(test)
        horseRef.current = test
        if (currentX[randomHorseIndex] <= 80) { // not finished
          moveHorse()
        } 
        else {
          setOnCompleteRemove(true);
          handleMessageVisible(randomHorse, "finish");
        }
      }, 800); // Adjust the delay as needed (in milliseconds)

    }
    moveHorse();
  }

  return (
    <>
      <div className="horse-container">
        {Object.values(horses).map((horse) => (<Horse id={horse.id} imgPath={horse.imgPath} style={horse.style} />))}
      </div>
      {startVisible && (
        <h1>
          <ReactTyped
            strings={["GAME INITIATED STARTING IN:", "5", "4", "3", "2", "1", "GO!"]}
            typeSpeed={40}
            onComplete={handleStart}
          />
        </h1>
      )}
      {messageVisible && (
        <h1 id="error">
          <ReactTyped
            strings={[message]}
            typeSpeed={70}
            onComplete={() => setMessageVisible(onCompleteRemove)}
          />
        </h1>
      )}
      <div className="button-wrapper">
        <button onClick={handleStartVisible}>
          Start race
        </button>
      </div>
    </>
  )
}

export default App
