import { Route, Routes } from "react-router-dom"
import Race from "./components/Race"
import ButtonPage from "./components/ButtonPage"

function App() {

  return (
    <>
      <Routes>
        <Route path="/HorseRace" element={<Race />} />
        <Route path="/HorseRace/tor" element={<ButtonPage horse="Tor"/>} />
        <Route path="/HorseRace/bergen" element={<ButtonPage horse="Bergen"/>} />
        <Route path="/HorseRace/aas" element={<ButtonPage horse="Aas"/>} />
        <Route path="/HorseRace/spiderman" element={<ButtonPage horse="Spiderman"/>} />
      </Routes>
    </>
  )
}

export default App
