import { useState } from 'react'
import MainRouter from "./router/router.jsx";
import {BrowserRouter} from "react-router-dom";
import { Button } from 'react-bootstrap';
function App() {
  const [count, setCount] = useState(0)

  return (
      <BrowserRouter>
          <MainRouter/>
      </BrowserRouter>
  )
}

export default App
