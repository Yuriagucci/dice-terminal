import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import customTheme from './theme'; // Import your custom theme

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider theme={customTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter> 
    </ChakraProvider>
  </StrictMode>,
)
