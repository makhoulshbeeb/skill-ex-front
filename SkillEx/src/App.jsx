
import './App.css'

import { Route, BrowserRouter, Routes, useParams } from "react-router-dom";

import Auth from './pages/Auth.jsx';
import Chat from './pages/Chat.jsx';
import Home from './pages/Home.jsx';
import Explore from './pages/Explore.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' />
                <Route path='/explore/:type' element={<Explore />} />
                <Route path='/community' />
                <Route path='/search/:search' />
                <Route path='/users/:username' />
                <Route path='/sessions' />
                <Route path='/auth/:sign' element={<Auth />} />
                <Route path='/chats' element={<Chat />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
