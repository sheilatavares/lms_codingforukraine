// CSS
import styles from './Home.module.css';
import logo from './img/cfu_logo.png';
import homeMobile from './img/home-mobile.jpg';

// hooks

import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';
import { LogoComplete } from './img/cfu-logo-complete';

// components

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, error: authError, loading } = useAuthentication();

  const [passwordType, setPasswordType] = useState('password');
  const [eye, setEye] = useState(false);
  const [type, setType] = useState(false);

  const Eye = () => {
    if (passwordType == 'password') {
      setPasswordType('text');
      setEye(true);
      setType(true);
    } else {
      setPasswordType('password');
      setEye(false);
      setType(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const user = {
      email,
      password,
    };

    const res = await login(user);
  };
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <>
      <div className="container-full bg-home">
        <div className="row g-0 g-0 pb-lg-3">
          <div className="col-lg-5 bg-yellow-light login-wrap mt-lg-5 pb-3">
            <div
              className={`${styles.logo} d-none d-lg-inline-flex justify-content-center align-items-center`}
            >
              <LogoComplete />
            </div>
            <img src={homeMobile} className="w-100 d-lg-none d-block"></img>
            <div className={styles.login}>
              <div className="row g-0">
                <div className="col-lg-8 offset-lg-4">
                  <h3 className="px-3 mt-n3 pt-3 ps-5">
                    Relying on technology and education for the human
                    development of Ukraine
                  </h3>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row g-0">
                  {/* <p className=" pt-2 mb-1">
                    <strong>Log in for access our content:</strong>
                  </p> */}
                  <div className="row g-0">
                    <div className="col-lg-7">
                      <div className="mb-3 pt-1">
                        <label className="form-label text-black">
                          <small>Email address</small>
                        </label>
                        <input
                          className="form-control"
                          type="email"
                          name="email"
                          required
                          placeholder="Your e-mail"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <div id="emailHelp" className="form-text"></div>
                      </div>
                    </div>
                  </div>
                  <div className="row g-0">
                    <div className="col-7 position-relative">
                      <div className="mb-3">
                        <label className="form-label text-black">
                          <small>Password</small>
                        </label>
                        <input
                          className="form-control ps-3"
                          type={passwordType}
                          name="password"
                          required
                          placeholder="Insert password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />

                        <i
                          onClick={Eye}
                          className={`fa ${eye ? 'fa-eye-slash' : 'fa-eye'}`}
                          style={{ top: 43, right: 10 }}
                        ></i>
                      </div>
                    </div>
                    <div className="col-4 d-flex align-items-end mb-3 ms-2">
                      {!loading && (
                        <button className="btn btn-primary float-end">
                          Login
                        </button>
                      )}
                      {loading && (
                        <button className="btn" disabled>
                          Wait...
                        </button>
                      )}
                      {error && <p className="error">{error}</p>}
                    </div>
                  </div>
                </div>
              </form>
              <div className="row g-0">
                <div className="col ms-1 ps-5">
                  Not a member yet? <Link to={`/register`}>Sign up</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 offset-lg-6 cards-home"></div>
        </div>
      </div>
      <div className="container-full bg-white">
        <div className="row g-0" style={{ maxHeight: '392px' }}>
          <div className="col-lg-5 offset-lg-1 py-2">
            <div className="py-4 px-3 px-lg-0">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/t19_w7j3OcY"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="col-lg-5 box-highlight p-3 mb-0 bg-white shadow border border-warning border-5">
            <h2>Give a try to start your programming career! </h2>{' '}
            {/* <p className="pt-3 fs-5">
                {' '}
                Try coding at the beginning of our course, we
                prepared a hands-on learning content that will help you to
                understand programming even if you never have contact with any
                code.{' '}
              </p> */}
            <p className="mt-4 lh-lg">
              {' '}
              Start your <span className="text-hgl">
                career as a developer
              </span>{' '}
              by learning in a deep and{' '}
              <span className="text-hgl">meaningful way</span> the basic
              concepts that are the foundation for any programming language.
            </p>
            <h4 className="pb-2 pt-4 text-blue fs-3">
              Course: Introduction to Javascript programming
            </h4>
            <strong>You will learn:</strong>
            <ul className={`${styles.boxCourse} pt-2 ps-1`}>
              <li>Problem solving</li>
              <li>Variables </li>
              <li>Arrays</li>
              <li>Loops</li>
              <li>Conditionals</li>
              <li>Objects</li>
              <li>Functions</li>
            </ul>
            <div className="mb-4">
              During the course, you will complete practical exercises so that
              you can have a realistic view of the language!
            </div>
            <div className="bg-yellow-light d-inline-block align-items-center p-3">
              <span className="text-hgl pt-5">
                <Link to={`/register`} className={styles.linkRegister}>
                  Join
                </Link>{' '}
                us for free!
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
