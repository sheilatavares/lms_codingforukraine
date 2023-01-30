import styles from './Login.module.css';

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

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const user = {
      email,
      password,
    };

    const res = await login(user);

    console.log(res);
  };
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <>
      <div className="container-full py-5  h-100">
        <div className="row g-0 justify-content-center">
          <div className="col-lg-5 bg-yellow-light mt-5 pb-3">
            <div className={styles.logo}>
              <LogoComplete />
            </div>
            <div className={styles.login}>
              <div className="row">
                <div className="col-lg-6 ps-5 offset-lg-4 text-start">
                  <h5 className="px-3 mt-n3 pt-5 ps-4">
                    Log in to access our content
                  </h5>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="row mt-4 pe-0">
                <div className="ps-5">
                  <div className="row">
                    <div className="col-12 w-100">
                      <div className="mb-3 pt-1 text-start">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label text-black"
                        >
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
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-3 text-start">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label text-black text-start"
                        >
                          <small>Password</small>
                        </label>
                        <input
                          className="form-control"
                          type="password"
                          name="password"
                          required
                          placeholder="Insert password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-5 text-start ps-4 ms-3 mb-3">
                    {!loading && (
                      <button className="btn btn-primary">Login</button>
                    )}
                    {loading && (
                      <button className="btn" disabled>
                        Wait...
                      </button>
                    )}
                    {error && <p className="error">{error}</p>}
                  </div>
                  <div className="col-lg-6 text-start pt-2">
                    Not a member yet? <Link to={`/register`}>Sign up</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
