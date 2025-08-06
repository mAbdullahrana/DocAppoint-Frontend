import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { SocketProvider } from './SocketContext.jsx'
import HydrateAuth from './HydrateAuth.jsx'

import { store } from '../store.js'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <HydrateAuth>
          <SocketProvider>
            <App />
          </SocketProvider>
        </HydrateAuth>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
