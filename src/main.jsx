import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "@/components/ui/theme"
import { Toaster } from "sonner"
import AuthContextProvider from './Context/AuthContext'
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvieder from './Context/CartContext'

const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <ThemeProvider defaultTheme="system"  >
        <QueryClientProvider client={queryClient}>
          <CartContextProvieder>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
          </CartContextProvieder>
        </QueryClientProvider>
      </ThemeProvider>
    </AuthContextProvider>
  </StrictMode >,
)
