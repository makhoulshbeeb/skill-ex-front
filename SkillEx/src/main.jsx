import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './main.css'
import { Provider } from 'react-redux'
import store from './app/Store.js'
import { Toaster } from 'react-hot-toast'
import { SocketContextProvider } from './context/SocketContext.jsx'
import { CallContextProvider } from './context/CallContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <SocketContextProvider>
                    <CallContextProvider>
                        <App />
                        <Toaster></Toaster>
                    </CallContextProvider>
                </SocketContextProvider>
            </BrowserRouter>
        </Provider>
    </StrictMode>,
)
