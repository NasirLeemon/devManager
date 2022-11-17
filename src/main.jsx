import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import { ContactProvider } from './context/ContactContext';
import { AuthProvider } from './context/Auth.Context';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>

    <ContactProvider>
    <App />
    </ContactProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
