  import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import './index.css'
  import App from './App.jsx'
  import { BrowserRouter } from "react-router-dom";
  import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
  const queryClient = new QueryClient()
import { HeroUIProvider } from '@heroui/react';
import { AuthContextProvider } from './context/AuthContext.jsx';


  createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
        <HeroUIProvider>
        <QueryClientProvider client={queryClient} >
          <AuthContextProvider >
        <App />
          </AuthContextProvider>
        </QueryClientProvider>        
        </HeroUIProvider>
      </BrowserRouter>
    </StrictMode>,
  )
