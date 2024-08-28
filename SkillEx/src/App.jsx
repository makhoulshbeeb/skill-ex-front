
import './App.css'

import { Route, BrowserRouter, Routes, useParams } from "react-router-dom";

import Navbar from './components/Navbar.jsx'
import Auth from './pages/Auth.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/home' element={<Navbar />}>
                    <Route path='/home' />
                    <Route path='/home/about' />
                    <Route path='/home/discover' />
                    <Route path='/home/community' />
                    <Route path='/home/search/:search' />
                    <Route path='/home/users/:username' />
                    <Route path='/home/chats' />
                    <Route path='/home/sessions' />
                </Route>
                <Route path='/auth/:sign' element={<Auth />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
