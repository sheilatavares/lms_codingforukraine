import { db } from '../../firebase/config';

import { Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Password.Reset.module.css';

import {
  getAuth,
  verifyPasswordResetCode,
  confirmPasswordReset,
  signInWithEmailAndPassword,
  sendEmailVerification,
  applyActionCode,
} from 'firebase/auth';
import { useAuthentication } from '../../hooks/useAuthentication';

const PasswordReset = () => {
  const auth = getAuth();
  const [verifyCode, setVerifyCode] = useState(null);
  const [updatedSuccessful, setUpdateSuccessful] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [password, setPassword] = useState('password');
  const [eye, setEye] = useState(false);
  const [type, setType] = useState(false);
  const [messageReturn, setMessageReturn] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const { timeActive, setTimeActive } = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [time, setTime] = useState(60);

  const {
    error: authError,
    loading,
    resendEmailVerification,
  } = useAuthentication();

  const Eye = () => {
    if (password == 'password') {
      setPassword('text');
      setEye(true);
      setType(true);
    } else {
      setPassword('password');
      setEye(false);
      setType(false);
    }
  };

  const getParameterByName = (name) => {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    let regexS = '[\\?&]' + name + '=([^&#]*)';
    let regex = new RegExp(regexS);
    let results = regex.exec(window.location.href);
    if (results == null) return '';
    else return decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  // Get the action to complete.
  const mode = getParameterByName('mode');

  const actionCode = getParameterByName('oobCode');
  // (Optional) Get the continue URL from the query parameter if available.
  const continueUrl = getParameterByName('continueUrl');
  // (Optional) Get the language code if available.
  const lang = getParameterByName('lang') || 'en';

  const CheckResetPassword = (auth, actionCode, continueUrl, lang) => {
    // Localize the UI to the selected language as determined by the lang
    // parameter.

    // Verify the password reset code is valid.
    verifyPasswordResetCode(auth, actionCode)
      .then((email) => {
        const accountEmail = email;

        // Show the reset screen with the user's email and ask the user for
        // the new password.
        // const newPassword = prompt('Please enter your new password');
        setVerifyCode(true);
      })
      .catch((error) => {
        // Invalid or expired action code. Ask user to try to reset the password
        // again.
        console.log(error);
      });
  };

  const handleSaveNewPassword = (e) => {
    e.preventDefault();
    // Save the new password.
    confirmPasswordReset(auth, actionCode, newPassword)
      .then((resp) => {
        // Password reset has been confirmed and new password updated.
        setUpdateSuccessful(true);
        // Display a link back to the app, or sign-in the user directly
        // if the page belongs to the same domain as the app:
      })
      .catch((error) => {
        // Error occurred during confirmation. The code might have expired or the
        // password is too weak.
        console.log(error);
      });
  };

  const CheckVerifyEmail = (auth, actionCode, continueUrl, lang) => {
    // Localize the UI to the selected language as determined by the lang
    // parameter.

    // Try to apply the email verification code.
    applyActionCode(auth, actionCode)
      .then((resp) => {
        setMessageReturn(true);
        // setTimeout(function () {
        //   window.location.assign('/my-home');
        // }, 5000);
      })
      .catch((error) => {
        // Code is invalid or expired. Ask the user to verify their email address
        // again.
        setErrorMessage(true);
      });
  };

  const handleResendEmailVerification = async (e) => {
    try {
      e.preventDefault();

      const res = await resendEmailVerification();

      setTimeActive(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  (() => {
    // Handle the user management action.
    switch (mode) {
      case 'resetPassword':
        // Display reset password handler and UI.
        CheckResetPassword(auth, actionCode, continueUrl, lang);
        break;

      case 'verifyEmail':
        // Display email verification handler and UI.
        CheckVerifyEmail(auth, actionCode, continueUrl, lang);
        break;
      default:
      // Error: invalid mode.
    }
  })();

  // console.log(auth.currentUser?.emailVerified);
  console.log(messageReturn);
  console.log(errorMessage);

  useEffect(() => {
    if (auth.currentUser?.emailVerified) {
      setMessageReturn(true);
      setErrorMessage(false);
      setTimeout(function () {
        window.location.assign('/myhome');
      }, 5000);
    } else {
      setMessageReturn(false);
      setErrorMessage(true);
    }
  }, [auth.currentUser?.emailVerified]);

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
    <div className="container my-5">
      <div className="row d-flex justify-content-center bg-white reset-password">
        <div className="col-lg-6 mb-5">
          {mode === 'verifyEmail' && (
            <>
              {messageReturn && (
                <>
                  <p className="text-center text-primary fs-2">
                    Your email address has been verified.
                  </p>
                  <p className="text-center text-primary fs-2">
                    Redirecting to course homepage...
                  </p>
                </>
              )}
              {errorMessage && !messageReturn && (
                <>
                  <p className="text-center text-primary fs-2">
                    Code is invalid or expired.
                  </p>
                  <p className="text-center text-primary fs-2">
                    Verify your email again.
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={handleResendEmailVerification}
                    disabled={timeActive}
                  >
                    Resend Email {timeActive && time}
                  </button>
                </>
              )}
            </>
          )}
          {mode === 'resetPassword' && verifyCode && !updatedSuccessful && (
            <>
              <h1 className="mt-5">Reset your Password {mode}</h1>
              <form
                onSubmit={handleSaveNewPassword}
                className="text-center mt-5 d-flex flex-column w-50"
              >
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label text-black text-start"
                >
                  <strong className="">Please insert your new password:</strong>
                </label>
                <div className="position-relative">
                  <input
                    className=""
                    type={password}
                    placeholder="Enter your password"
                    name="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />

                  <i className="fa fa-lock position-absolute"></i>
                  <i
                    onClick={Eye}
                    className={`fa ${eye ? 'fa-eye-slash' : 'fa-eye'}`}
                  ></i>
                </div>
                <div className="col-6 align-self-end mt-3">
                  <button className="btn btn-primary w-100" type="submit">
                    Reset Password
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
        {updatedSuccessful && (
          <>
            <h3>Your password has been updated.</h3>
            <div className="col-lg-4 align-self-end mt-5">
              <Link to={'/login'} className="btn btn-primary w-100 mt-5">
                Go to login page
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
