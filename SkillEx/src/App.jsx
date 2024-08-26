
import './App.css'

import { Route, BrowserRouter, Routes } from "react-router-dom";

import Navbar from './components/Navbar.jsx'
import Auth from './pages/Auth.jsx';

function App() {

    return (
        <BrowserRouter>
            <Navbar></Navbar>
            <Routes>
                <Route path='/' />
                <Route path='/auth/:sign' element={<Auth />} />
                <Route path='/about' />
                <Route path='/discover' />
                <Route path='/community' />
                <Route path='/search/:search' />
                <Route path='/users/:username' />
                <Route path='/chats' />
                <Route path='/sessions' />
            </Routes>
        </BrowserRouter>
    )
}

export default App
