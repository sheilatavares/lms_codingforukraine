import styles from './Register.module.css';
import { useAuthValue } from '../../context/AuthContext';
import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';
import photo from './img/coding-friends-register.jpg';

const Register = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [time, setTime] = useState(60);
  const [timeActive, setTimeActive] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [passwordTypeConfirm, setPasswordTypeConfirm] = useState('password');
  const [eye, setEye] = useState(false);
  const [type, setType] = useState(false);
  const [eyeConfirm, setEyeConfirm] = useState(false);
  const [typeConfirm, setTypeConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

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
  const eyeConfirmPassword = () => {
    if (passwordTypeConfirm == 'password') {
      setPasswordTypeConfirm('text');
      setEyeConfirm(true);
      setTypeConfirm(true);
    } else {
      setPasswordTypeConfirm('password');
      setEyeConfirm(false);
      setTypeConfirm(false);
    }
  };

  const {
    createUser,
    error: authError,
    loading,
    resendEmailVerification,
  } = useAuthentication();

  const handleSubmit = async (e) => {
    try {
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
      setSuccess(true);
      setTimeActive(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleResendEmailVerification = async (e) => {
    try {
      e.preventDefault();
      setError('');

      const res = await resendEmailVerification();
      setSuccess(true);
      setTimeActive(true);
    } catch (error) {
      console.error(error.message);
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

  useEffect(() => {
    let interval = null;
    if (timeActive && time !== 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setTimeActive(false);
      setTime(60);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeActive, time]);

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
          {!success ? (
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
                <div className="col-lg-6 position-relative">
                  {' '}
                  <label className="form-label text-black w-100 px-3 mt-3">
                    <small>Password:</small>
                    <input
                      type={passwordType}
                      className="form-control"
                      name="password"
                      required
                      placeholder="Insert password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <i
                      onClick={Eye}
                      className={`fa ${eye ? 'fa-eye-slash' : 'fa-eye'}`}
                      style={{ top: 50, right: 30 }}
                    ></i>
                  </label>
                </div>
                <div className="col-lg-6 position-relative">
                  <label className="form-label text-black w-100 px-3 mt-3">
                    <small>Confirm Password:</small>
                    <input
                      type={passwordTypeConfirm}
                      className="form-control"
                      name="passwordConfirm"
                      required
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <i
                      onClick={eyeConfirmPassword}
                      className={`fa ${eyeConfirm ? 'fa-eye-slash' : 'fa-eye'}`}
                      style={{ top: 50, right: 30 }}
                    ></i>
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
          ) : (
            <div className="row g-0 d-flex justify-content-center align-items-center">
              <div className="border col-lg-7 rounded bg-white p-4">
                <h3 className="text-center mb-4">Verify your Email Address</h3>
                <p>A verification has been sent to:</p>
                <p className="text-primary">{email}</p>
                <p>
                  Follow the instructions sent to your email to verify your
                  account.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={handleResendEmailVerification}
                  disabled={timeActive}
                >
                  Resend Email {timeActive && time}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
