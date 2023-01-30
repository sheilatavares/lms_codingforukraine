import styles from './Register.module.css';

import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';
import photo from './img/coding-friends-register.jpg';

const Register = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const user = {
      displayName,
      email,
      password,
      confirmPassword,
    };

    if (password !== confirmPassword) {
      setError('Passwords must be the same!');
      return;
    }

    const res = await createUser(user);

    console.log(res);
  };
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);
  return (
    <div className="container-full p-0 bg-white-yellow pb-5 mt-2">
      <div className="row g-0 justify-content-center pb-5">
        <h1 className="text-primary py-5">
          Register to start your success journey!
        </h1>
        <div className="col-lg-4">
          <img src={photo} className="w-100 shadow"></img>
        </div>
        <div className="col-lg-7 ">
          <form
            onSubmit={handleSubmit}
            className="p-4 m-0 w-100 bg-white ms-3 shadow h-100"
          >
            <div className="row g-0 pt-4">
              <div className="col-lg-6">
                <label className="form-label text-black w-100 px-3">
                  <small>Name:</small>
                  <input
                    type="text"
                    className="form-control"
                    name="displayName"
                    required
                    placeholder="Your user name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </label>
              </div>
              <div className="col-lg-6">
                <label className="form-label text-black w-100 px-3">
                  <small>E-mail:</small>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    required
                    placeholder="Your e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div className="row g-0">
              <div className="col-lg-6">
                {' '}
                <label className="form-label text-black w-100 px-3 mt-3">
                  <small>Password:</small>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    placeholder="Insert password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </div>
              <div className="col-lg-6">
                <label className="form-label text-black w-100 px-3 mt-3">
                  <small>Confirm Password:</small>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col mt-3 me-3 align-self-end text-end">
                {!loading && (
                  <button className="btn btn-primary">Register</button>
                )}
                {loading && (
                  <button className="btn" disabled>
                    Wait...
                  </button>
                )}
                {error && <p className="error">{error}</p>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;