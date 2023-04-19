import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';

import { Link, Navigate } from 'react-router-dom';
import styles from './VerifyPasswordEmail.module.css';

import {
  getAuth,
  verifyPasswordResetCode,
  confirmPasswordReset,
  signInWithEmailAndPassword,
  sendEmailVerification,
  applyActionCode,
} from 'firebase/auth';

import { useAuthentication } from '../../hooks/useAuthentication';
import { useAuthValue } from '../../context/AuthContext';

function VerifyPasswordEmail() {
  const { auth } = useAuthentication();
  const { timeActive, setTimeActive } = useAuthValue();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [time, setTime] = useState(60);
  const [messageReturn, setMessageReturn] = useState(null);
  const [verifyCode, setVerifyCode] = useState(null);
  const [updatedSuccessful, setUpdateSuccessful] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [password, setPassword] = useState('password');
  const [eye, setEye] = useState(false);
  const [type, setType] = useState(false);

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

  //Implement getParameterByName()
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

  const handleVerifyEmail = (auth, actionCode, continueUrl, lang) => {
    // Localize the UI to the selected language as determined by the lang
    // parameter.

    // Try to apply the email verification code.
    applyActionCode(auth, actionCode)
      .then((resp) => {
        setMessageReturn(
          'Your email address has been verified. We are redirecting you to the course home page...',
        );
        setTimeout(function () {
          window.location.assign('/my-home');
        }, 5000);
      })
      .catch((error) => {
        // Code is invalid or expired. Ask the user to verify their email address
        // again.
        setMessageReturn(
          'Code is invalid or expired. Verify your email address again.',
        );
      });
  };

  const resendEmailVerification = () => {
    setButtonDisabled(true);
    sendEmailVerification(auth.currentUser)
      .then(() => {
        setButtonDisabled(false);
        setTimeActive(true);
      })
      .catch((err) => {
        setMessageReturn(err.message);
        setButtonDisabled(false);
      });
  };

  const handleResetPassword = (auth, actionCode, continueUrl, lang) => {
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

  const verifyMode = () => {
    // Handle the user management action.
    switch (mode) {
      case 'resetPassword':
        // Display reset password handler and UI.
        handleResetPassword(auth, actionCode, continueUrl, lang);
        break;

      case 'verifyEmail':
        // Display email verification handler and UI.
        handleVerifyEmail(auth, actionCode, continueUrl, lang);
        break;
      default:
      // Error: invalid mode.
    }
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

  useEffect(() => {
    const interval = setInterval(() => {
      auth?.currentUser
        ?.reload()
        .then(() => {
          if (auth.currentUser?.emailVerified) {
            clearInterval(interval);
            window.location.assign('/my-home');
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }, 1000);
  }, [auth.currentUser]);

  verifyMode();
  console.log(mode);

  return (
    <div className="container">
      <div className="row bg-white d-flex justify-content-center align-items-center text-center">
        <div className="col-lg-7 bg-light rounded border my-3 d-flex flex-column justify-content-center p-4 align-items-center">
          {!messageReturn ? (
            <>
              <h2 className="text-center">Verify your Email Address</h2>
              <p>A verification has been sent to:</p>
              <p>{auth?.currentUser?.email}</p>
              <p>Follow the instruction in the email to verify your account</p>
              <button
                className="btn btn-primary"
                onClick={resendEmailVerification}
                disabled={timeActive}
              >
                Resend Email {timeActive && time}
              </button>
            </>
          ) : (
            <h2 className="text-center">{messageReturn}</h2>
          )}
          {verifyCode && !updatedSuccessful && (
            <>
              <h1 className="mt-5">Reset your Password</h1>
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
          {updatedSuccessful && (
            <div className="col-lg-5 my-5 d-flex">
              <h3>Your password has been updated.</h3>
              <div className="col-lg-4 align-self-end mt-5">
                <Link to={'/login'} className="btn btn-primary w-100 mt-5">
                  Go to login page
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerifyPasswordEmail;
