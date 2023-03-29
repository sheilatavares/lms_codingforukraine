import { db } from '../../firebase/config';
import { useReducer } from 'react';
import { Navigate } from 'react-router-dom';

import {
  getAuth,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from 'firebase/auth';

const PasswordReset = () => {
  const auth = getAuth();

  const getParameterByName = (name) => {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    var regexS = '[\\?&]' + name + '=([^&#]*)';
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
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
        const newPassword = prompt('Please enter your new password');

        // Save the new password.
        confirmPasswordReset(auth, actionCode, newPassword)
          .then((resp) => {
            // Password reset has been confirmed and new password updated.
            // Display a link back to the app, or sign-in the user directly
            // if the page belongs to the same domain as the app:
            auth
              .signInWithEmailAndPassword(accountEmail, newPassword)
              .then(() => {
                if (continueUrl) {
                  // If a continue URL is available, display a button which on
                  // click redirects the user back to the app via continueUrl with
                  // additional state determined from that URL's parameters.
                  window.location.assign(continueUrl);
                } else {
                  // If there is no continue URL, display a success message to the user.
                  alert('Your password has been reset successfully.');
                }
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            // Error occurred during confirmation. The code might have expired or the
            // password is too weak.
            console.log(error);
          });
      })
      .catch((error) => {
        // Invalid or expired action code. Ask user to try to reset the password
        // again.
        console.log(error);
      });
  };

  CheckResetPassword(auth, actionCode, continueUrl, lang);

  const handlePasswordReset = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container mt-5">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-8">
          <h1 className="text-white">Reset your Password</h1>
          <form
            onSubmit={handlePasswordReset}
            className="text-center mt-5 d-flex flex-column w-50"
          >
            <label>
              Email:
              <input
              // type="email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <button type="submit">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
