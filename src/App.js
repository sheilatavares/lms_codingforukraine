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
import Reset from './pages/reset/Reset';
import Account from './pages/Account/Account';
import PasswordReset from './pages/PasswordReset/PasswordReset';
import Donate from './pages/Donate/Donate';

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  let userId = auth?.currentUser?.uid;

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

  // console.log('verificado?', user?.emailVerified);

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
                element={
                  userId === 'B6BPdCJgzicvHTKvg7sRz1wJOZx1' ? (
                    <CreateModule />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/posts/create-section"
                element={
                  userId === 'B6BPdCJgzicvHTKvg7sRz1wJOZx1' ? (
                    <CreateSection />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/posts/create"
                element={
                  userId === 'B6BPdCJgzicvHTKvg7sRz1wJOZx1' ? (
                    <CreatePost />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/posts/edit/:id"
                element={
                  userId === 'B6BPdCJgzicvHTKvg7sRz1wJOZx1' ? (
                    <EditPost />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />

              <Route
                exact
                path="/lesson/:moduleSlug/:sectionSlug/:slug/:order/"
                element={!user ? <Navigate to="/" /> : <Lesson />}
              />
              <Route path="/search" element={<Search />} />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/myhome" />}
              />
              <Route path="/register" element={!user ? <Register /> : null} />

              <Route
                path="/reset"
                element={!user ? <Reset /> : <Navigate to="/myhome" />}
              />
              <Route
                path="/resetpassword"
                element={!user ? <PasswordReset /> : <Navigate to="/myhome" />}
              />

              <Route
                path="/account"
                element={
                  user ? <Account user={{ user }} /> : <Navigate to="/" />
                }
              />
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                exact
                path="/dashboard/:moduleSlug/:sectionSlug/:slug"
                element={
                  !userId === 'B6BPdCJgzicvHTKvg7sRz1wJOZx1' ? (
                    <Navigate to="/" />
                  ) : (
                    <Dashboard />
                  )
                }
              />
              <Route
                path="/myhome"
                element={user ? <HomeCourse /> : <Navigate to="/login" />}
              />
              <Route path="/donate" element={<Donate />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
