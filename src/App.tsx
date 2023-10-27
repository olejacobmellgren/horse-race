import { Route, Routes } from "react-router-dom"
import Race from "./components/Race"
import ButtonPage from "./components/ButtonPage"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Race />} />
        <Route path="tor" element={<ButtonPage horse="Tor"/>} />
        <Route path="bergen" element={<ButtonPage horse="Bergen"/>} />
        <Route path="aas" element={<ButtonPage horse="Aas"/>} />
        <Route path="spiderman" element={<ButtonPage horse="Spiderman"/>} />
      </Routes>
    </>
  )
}

export default App
