import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { TextareaProvider } from './redux/TextareaReducer'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TextareaProvider> 
    <App />
    </TextareaProvider>
  </React.StrictMode>,
)
