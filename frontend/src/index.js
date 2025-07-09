import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App';
import { AuthProvider } from './contexts/AuthContext.jsx'
import { OrderProvider } from './contexts/OrderContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <OrderProvider>
        <App />
      </OrderProvider>
    </AuthProvider>
  </BrowserRouter>
  // </React.StrictMode>
);