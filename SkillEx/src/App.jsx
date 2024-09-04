
import './App.css'

import { Route, BrowserRouter, Routes, useParams } from "react-router-dom";

import Navbar from './components/common/Navbar.jsx'
import Auth from './pages/Auth.jsx';
import Chat from './pages/Chat.jsx';
import Home from './pages/Home.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes path='/'>
                <Route path='/app' element={<Navbar />}>
                    <Route path='/app/home' element={<Home />} />
                    <Route path='/app/about' />
                    <Route path='/app/discover' />
                    <Route path='/app/community' />
                    <Route path='/app/search/:search' />
                    <Route path='/app/users/:username' />
                    <Route path='/app/sessions' />
                </Route>
                <Route path='/auth/:sign' element={<Auth />} />
                <Route path='/chats' element={<Chat />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
