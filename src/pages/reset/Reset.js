import styles from './Reset.module.css';

import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';
// import logo from '../Home/img/cfu_logo.png';
import { LogoComplete } from '../Home/img/cfu-logo-complete';

// hooks

import { useNavigate, Link } from 'react-router-dom';

const Reset = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successful, setSuccess] = useState(undefined);

  const {
    resetPassword,
    error: authError,
    loading,
    success,
  } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    const res = await resetPassword(email);
    if (res instanceof Error) {
      setError(res.message);
    }
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
    if (success) {
      setSuccess(true);
    }
  }, [authError, success]);

  return (
    <>
      <div className="container-full py-5  h-100">
        <div className="row g-0 justify-content-center">
          <h1 className="text-white">Request Password Reset</h1>
          <div className="col-lg-5 bg-yellow-light mt-5 pb-3">
            <div className={styles.login}>
              <form onSubmit={handleSubmit} className="row mt-4 w-100">
                <div className="ps-5">
                  <div className="row">
                    <div className="col-12 w-100">
                      <div className="mb-3 pt-1 text-start">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label text-black"
                        >
                          <small>Please enter your email:</small>
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
                </div>

                <div className="row ps-5 text-center">
                  <div className="col-lg-8 text-center mb-3">
                    {!loading && (
                      <button className="btn btn-primary w-100">
                        Request Password Reset
                      </button>
                    )}
                    {loading && (
                      <button className="btn" disabled>
                        Wait...
                      </button>
                    )}
                  </div>
                  <div className="col-lg-12 text-center mb-3">
                    {error && <p className="error">{error}</p>}
                    {successful && (
                      <>
                        <h5 className="text-start">
                          Password reset email sent
                        </h5>
                        <p>
                          We just sent a message to the email you provided with
                          a link to reset your password. Please check your inbox
                          and follow the instruction in the email.
                        </p>
                      </>
                    )}
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

export default Reset;
