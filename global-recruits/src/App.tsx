import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authenticate from './pages/Authenticate';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import Profile from './protectedPages/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/authenticate" element={<Authenticate />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
