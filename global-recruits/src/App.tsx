import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingPage from './pages/LoadingPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

const Authenticate = React.lazy(() => import('./pages/AuthenticatePage'));
const RegisterPage = React.lazy(() => import('./protectedPages/RegisterPage'));
const VideoPage = React.lazy(() => import('./pages/VideoPage'));
const Profile = React.lazy(() => import('./protectedPages/Profile'));

export default function App() {
  return (
    <React.Suspense fallback={<LoadingPage />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>

          <Route path="/authenticate" element={<Authenticate />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/video" element={<VideoPage />}></Route>
          <Route path="/loading" element={<LoadingPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </BrowserRouter>
    </React.Suspense>
  )
}
