import { db } from '../../firebase/config';

import { Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import {
  getAuth,
  verifyPasswordResetCode,
  confirmPasswordReset,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const PasswordReset = () => {
  const auth = getAuth();
  const [verifyCode, setVerifyCode] = useState(null);
  const [updatedSuccessful, setUpdateSuccessful] = useState(null);
  const [newPassword, setNewPassword] = useState(null);

  const getParameterByName = (name) => {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    let regexS = '[\\?&]' + name + '=([^&#]*)';
    let regex = new RegExp(regexS);
    let results = regex.exec(window.location.href);
    if (results == null) return '';
    else return decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

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

  CheckResetPassword(auth, actionCode, continueUrl, lang);

  return (
    <div className="container mt-5">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-8">
          <h1 className="text-white">Reset your Password</h1>
          {verifyCode && (
            <form
              onSubmit={handleSaveNewPassword}
              className="text-center mt-5 d-flex flex-column w-50"
            >
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
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button type="submit">Reset Password</button>
            </form>
          )}
          {updatedSuccessful && (
            <div>
              <h2>Your password has been updated.</h2>
              <Link to={'/login'} className="btn btn-primary">
                Go to login page
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
