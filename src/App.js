import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';
import { useLocation } from 'react-router-dom';

// hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

// pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Lesson from './pages/Lesson/Lesson';

// components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Navbar/Footer';
import CreatePost from './pages/CreatePost/CreatePost';
import Search from './pages/Search/Search';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import EditPost from './pages/EditPost/EditPost';

// context
import { AuthProvider } from './context/AuthContext';
import CreateModule from './pages/CreateModule/CreateModule';
import CreateSection from './pages/CreateSection/CreateSection';
import HomeCourse from './pages/HomeCourse/HomeCourse';
function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return (
      <div className="d-flex justify-content-center pt-5">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container-full">
            <Routes>
              <Route
                path="/"
                element={user ? <Navigate to="/myhome" /> : <Home />}
              />
              <Route path="/about" element={<About />} />
              <Route
                path="/posts/create-module"
                element={user ? <CreateModule /> : <Navigate to="/login" />}
              />
              <Route
                path="/posts/create-section"
                element={user ? <CreateSection /> : <Navigate to="/login" />}
              />
              <Route
                path="/posts/create"
                element={user ? <CreatePost /> : <Navigate to="/login" />}
              />
              <Route
                path="/posts/edit/:id"
                element={user ? <EditPost /> : <Navigate to="/login" />}
              />

              <Route
                exact
                path="/lesson/:id/:moduleId/:sectionId/:order"
                element={!user ? <Navigate to="/" /> : <Lesson />}
              />
              <Route path="/search" element={<Search />} />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/myhome" />}
              />
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/myhome" />}
              />
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/myhome"
                element={user ? <HomeCourse /> : <Navigate to="/login" />}
              />
              <Route
                path="*"
                element={user ? <Navigate to="/myhome" /> : <Navigate to="/" />}
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
