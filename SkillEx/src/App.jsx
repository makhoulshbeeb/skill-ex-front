
import './App.css'

import { Route, Routes, useNavigate } from "react-router-dom";

import Auth from './pages/Auth.jsx';
import Chat from './pages/Chat.jsx';
import Home from './pages/Home.jsx';
import Explore from './pages/Explore.jsx';
import User from './pages/User.jsx';
import Video from './pages/Video.jsx';
import toast from 'react-hot-toast';
import Search from './pages/Search.jsx';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' />
            <Route path='/explore/:type' element={<Explore />} />
            <Route path='/search/' element={<Search />} />
            <Route path='/user/:username' element={<User />} />
            <Route path='/sessions' element={<Video />} />
            <Route path='/auth/:sign' element={<Auth />} />
            <Route path='/auth/signup/categories' element={<Auth />} />
            <Route path='/chats' element={<Chat />} />
        </Routes>
    )
}

export default App
