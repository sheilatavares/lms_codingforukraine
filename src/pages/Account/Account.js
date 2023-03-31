import styles from './Account.module.css';

import P from 'prop-types';

import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';

import { useNavigate, Link } from 'react-router-dom';

const Account = () => {
  const { auth } = useAuthentication();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [error, setError] = useState('');
  const [formName, setFormName] = useState(null);
  const [formPassword, setFormPassword] = useState(null);
  const [formEmail, setFormEmail] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const {
    updateDisplayName,
    changeEmail,
    error: authError,
    loading,
    systemMessageReturn,
    changePassword,
  } = useAuthentication();
  const [successful, setSuccess] = useState(undefined);

  const handleSubmitName = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    const res = await updateDisplayName(displayName);
    if (res instanceof Error) {
      setError(res.message);
    }
    setFormName(false);

    // console.log(res);
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const res = await changeEmail(email, password);
    if (res instanceof Error) {
      setError(res.message);
    }
    setFormEmail(false);

    // console.log(res);
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const res = await changePassword(newPassword, currentPassword);
    if (res instanceof Error) {
      setError(res.message);
    }
    setFormEmail(false);

    // console.log(res);
  };

  useEffect(() => {
    if (!auth.currentUser) {
      // If no user is logged in, redirect to the login page
      navigate('/login');
    } else {
      // If a user is logged in, update the user state with their data
      setUser(auth.currentUser);
    }
    if (systemMessageReturn) {
      setSuccess(true);
    }
  }, [auth.currentUser, navigate, systemMessageReturn]);

  const ShowFormName = () => {
    setFormName(true);
  };
  const ShowFormEmail = () => {
    setFormEmail(true);
  };
  const ShowFormPassword = () => {
    setFormPassword(true);
  };

  return (
    <>
      <div className="container py-5  h-100">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8 bg-white">
            <div className="row g-0 d-flex justify-content-center">
              <div className="col-lg-6 align-self-center p-4">
                <h3 className="text-primary">Account</h3>
                {user && (
                  <>
                    <div className="row mt-4">
                      <div className="d-flex align-items-center">
                        <h4>Display name</h4>
                        <Link onClick={ShowFormName} className="ms-4">
                          Change
                        </Link>
                      </div>
                      <div className="row">
                        <div className="col-lg-12">{user.displayName}</div>
                      </div>
                    </div>
                    {formName && (
                      <div className="row mt-4 ps-0 mb-5 border-bottom">
                        <div className="ps-0 mb-4">
                          <form onSubmit={handleSubmitName}>
                            <label
                              htmlFor="email"
                              className="form-label text-black"
                            >
                              <small className="text-primary">
                                <strong>Enter your new display name:</strong>
                              </small>
                            </label>
                            <div className="d-flex">
                              <input
                                className="form-control"
                                type="name"
                                name="text"
                                required
                                placeholder="Insert your new display name:"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                              />
                              <button className="btn btn-primary ms-4">
                                Save
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}

                    <div className="row mt-4">
                      <div className="d-flex align-items-center">
                        <h4>Email</h4>
                        <Link onClick={ShowFormEmail} className="ms-4">
                          Change
                        </Link>
                      </div>
                    </div>
                    <div className="row"></div>
                    <div className="row">
                      <div className="col-lg-12">{user.email}</div>
                    </div>
                    {formEmail && (
                      <div className="row mt-4 ps-0 border-bottom mb-5">
                        <div className="ps-0 ">
                          <form onSubmit={handleSubmitEmail} className="mb-4">
                            <label
                              htmlFor="email"
                              className="form-label text-black"
                            >
                              <small className="text-primary">
                                <strong>Enter your new email:</strong>
                              </small>
                            </label>
                            <div className="d-flex">
                              <input
                                className="form-control"
                                type="email"
                                name="email"
                                required
                                placeholder="Insert your new email:"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                            <label
                              htmlFor="password"
                              className="form-label text-black mt-3"
                            >
                              <small className="text-primary">
                                <strong>Enter your password:</strong>
                              </small>
                            </label>
                            <div className="d-flex">
                              <input
                                className="form-control"
                                type="password"
                                name="password"
                                required
                                placeholder="Insert your password:"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <button className="btn btn-primary ms-4">
                                Save
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}

                    <div className="row mt-4">
                      <div className="col-4 d-flex align-items-center">
                        <h4>Password</h4>
                        <Link onClick={ShowFormPassword} className="ms-4">
                          Change
                        </Link>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">******</div>
                    </div>
                    {formPassword && (
                      <div className="row mt-4 ps-0 mb-5 border-bottom">
                        <div className="ps-0 mb-4">
                          <form onSubmit={handleSubmitPassword}>
                            <div>
                              <label
                                htmlFor="email"
                                className="form-label text-black"
                              >
                                <small className="text-primary">
                                  <strong>Enter your current password:</strong>
                                </small>
                              </label>
                              <div className="d-flex">
                                <input
                                  className="form-control"
                                  type="password"
                                  name="password"
                                  required
                                  placeholder="Insert your new password"
                                  value={currentPassword}
                                  onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <label
                              htmlFor="email"
                              className="form-label text-black mt-4"
                            >
                              <small className="text-primary">
                                <strong>Enter your new password:</strong>
                              </small>
                            </label>
                            <div className="d-flex">
                              <input
                                className="form-control"
                                type="password"
                                name="password"
                                required
                                placeholder="Insert your new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                              />
                              <button className="btn btn-primary ms-4">
                                Save
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="col-lg-6 d-flex align-items-center justify-content-center text-center">
                {systemMessageReturn && (
                  <h4 className="text-primary">
                    <strong>{systemMessageReturn}</strong>
                  </h4>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
