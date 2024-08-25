
import './App.css'

import { Route, BrowserRouter, Routes } from "react-router-dom";

import Navbar from './components/Navbar.jsx'

function App() {

    return (
        <BrowserRouter>
            <Navbar></Navbar>
            <Routes>
                <Route path='/' />
                <Route path='/auth/:sign' />
                <Route path='/about' />
                <Route path='/discover' />
                <Route path='/community' />
                <Route path='/search/:search' />
                <Route path='/user/:username' />
                <Route path='/chat' />
                <Route path='/session' />
            </Routes>
        </BrowserRouter>
    )
}

export default App
