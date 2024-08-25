
import './App.css'

import { Route, BrowserRouter, Routes } from "react-router-dom";

import Navbar from './components/Navbar.jsx'

function App() {

    return (
        <BrowserRouter>
            <Navbar></Navbar>
        </BrowserRouter>
    )
}

export default App
