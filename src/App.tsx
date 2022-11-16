import { QueryClientProvider } from 'react-query';
import queryClient from '../src/shared/utils/queryClient';
import { ClientView } from 'pages/ClientView/ClientView';
import { Options } from 'pages/Options/Options';
import { Register } from 'pages/Register/Register';
import { UserVIew } from 'pages/UserView/UserView';
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Login } from './pages/Login/Login';

function App() {
  
  return (
    <div style={{width: '90%', justifyContent: 'center', margin: 'auto'}}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/select' element={<Options />} />
            <Route path='/register' element={<Register />} />
            <Route path='/user' element={<UserVIew />} />
            <Route path='/client' element={<ClientView />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>

  );
}

export default App;
