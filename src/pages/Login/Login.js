import styles from './Login.module.css';

import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';
// import logo from '../Home/img/cfu_logo.png';
import { LogoComplete } from '../Home/img/cfu-logo-complete';

// hooks

import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
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

  const { login, error: authError, loading } = useAuthentication();

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
    <div className="container-full py-lg-5 loginContent bgBlue">
      <div className="row g-0 justify-content-center mt-lg-5">
        <div className="col-lg-5 bg-yellow-light mt-5 pb-3">
          <div className={`${styles.logo} d-none d-lg-block`}>
            <LogoComplete />
          </div>
          <div className={styles.login}>
            <div className="row g-0">
              <div className="col-lg-6 ps-4 offset-lg-4 text-start">
                <h5 className="px-3 mt-n3 pt-5 ps-4">
                  Log in to access our content
                </h5>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="row mt-4 w-100">
              <div className="ps-5">
                <div className="row g-0">
                  <div className="col-12 w-100">
                    <div className="mb-3 pt-1 text-start">
                      <label htmlFor="email" className="form-label text-black">
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
                    </div>
                  </div>
                </div>
                <div className="row g-0">
                  <div className="col-12">
                    <div className="mb-3 text-start position-relative">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label text-black text-start"
                      >
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
                      {/* <i className="fa fa-lock" style={{ top: 43 }}></i> */}
                      <i
                        onClick={Eye}
                        className={`fa ${eye ? 'fa-eye-slash' : 'fa-eye'}`}
                        style={{ top: 43 }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row g-0 ps-5">
                <div className="col-5 text-start mb-3">
                  {!loading && (
                    <button className="btn btn-primary">Login</button>
                  )}
                  {loading && (
                    <button className="btn" disabled>
                      Wait...
                    </button>
                  )}
                  {error && (
                    <small className="text-danger d-block pt-2">{error}</small>
                  )}
                </div>

                <Link to={`/reset`} className="col-6 text-center pt-2">
                  <small>I forgot my password</small>
                </Link>
              </div>
              <div className="row g-0 ps-5">
                <div className="col-lg-12 text-start pt-2">
                  Not a member yet? <Link to={`/register`}>Sign up</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
