import { CSSProperties } from 'react';
import ReactTyped from "react-typed";
import Horse from './components/Horse';
import { useState, useEffect, useRef } from 'react';
import OkonomiTor from './assets/OkonomiTor.png';
import Bergen from './assets/Bergen.png';
import Aas from './assets/Aas.png';
import Spidermann from './assets/Spidermann.png';

function App() {
  const [isVisible, setIsVisible] = useState(false);

  function handleVisible() {
    setIsVisible(!isVisible);
  }

  // interface moveProps {
  //   horse: HorseProps;
  //   xValue: number;
  // }

  interface HorseProps {
    imgPath: string;
    style: CSSProperties;
    id: string;
  }

  const [horses, setHorses] = useState<{ [id: string]: HorseProps }>({
    "tor": {
      imgPath: OkonomiTor,
      style: { left: 'calc(1 * (100vw - 250px) / 5)' },
      id: 'tor'
    },
    "bergen": {
      imgPath: Bergen,
      style: { left: 'calc(2 * (100vw - 250px) / 5)' },
      id: 'bergen'
    },
    "aas": {
      imgPath: Aas,
      style: { left: 'calc(3 * (100vw - 250px) / 5)' },
      id: 'aas'
    },
    "spider": {
      imgPath: Spidermann,
      style: { left: 'calc(4 * (100vw - 250px) / 5)' },
      id: 'spider'
    }
  });
  const horseRef = useRef(horses)
  horseRef.current = horses


  function handleStart() {
    handleVisible();
    //set horses to start position
    let currentX = [0, 0, 0, 0];

    const startHorses = {
      "tor": { ...horses.tor, style: { ...horses.tor.style, left: currentX[0], top: '0px' } },
      "bergen": { ...horses.bergen, style: { ...horses.bergen.style, left: currentX[1], top: '200px' } },
      "aas": { ...horses.aas, style: { ...horses.aas.style, left: currentX[2], top: '400px' } },
      "spider": { ...horses.spider, style: { ...horses.spider.style, left: currentX[3], top: '600px' } }
    }
    setHorses(startHorses)
    horseRef.current = startHorses;



    function moveHorse() {
      const randomHorseIndex = Math.floor(Math.random() * 4);
      const randomHorse = Object.keys(horses)[randomHorseIndex];
      currentX[randomHorseIndex] += 150;
      setTimeout(() => {
        const test = { ...horseRef.current }
        test[randomHorse] = { ...test[randomHorse], style: { ...test[randomHorse].style, left: (currentX[randomHorseIndex].toString() + 'px') } }
        setHorses(test)
        horseRef.current = test
        if (currentX[randomHorseIndex] <= 1650) { // not finished
          moveHorse()
        } 
        else {
          return;
        }
      }, 900); // Adjust the delay as needed (in milliseconds)

    }
    moveHorse();
  }

  return (
    <>
      <div className="horse-container">
        {Object.values(horses).map((horse) => (<Horse id={horse.id} imgPath={horse.imgPath} style={horse.style} />))}
      </div>
      {isVisible && (
        <>
          <h1>
            <ReactTyped
              strings={["GAME INITIATED STARTING IN:", "5", "4", "3", "2", "1", "GO!"]}
              typeSpeed={40}
              onComplete={handleStart}
            />
          </h1>
        </>)}
      <div className="ButtonWrapper">
        <button onClick={handleVisible}>
          Start race
        </button>
      </div>
    </>
  )
}

export default App
