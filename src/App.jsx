import React from "react"
import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Create from "./pages/Create"
import Details from "./pages/Details"
import Update from "./pages/Update"



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Create />} />
      <Route path="/view" element={<Details />} />
      <Route path="/edit" element={<Update />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
