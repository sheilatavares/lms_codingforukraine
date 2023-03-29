import { db } from '../firebase/config';
import { useReducer } from 'react';
import { Navigate } from 'react-router-dom';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from 'firebase/auth';

import { useState, useEffect } from 'react';

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(undefined);
  const [loading, setLoading] = useState(null);

  //cleanup
  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  //register
  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      await updateProfile(user, {
        displayName: data.displayName,
      });
      setLoading(false);
      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;

      if (error.message.includes('Password')) {
        systemErrorMessage =
          'Your password must contain at least 6 characters.';
      } else if (error.message.includes('email-already')) {
        systemErrorMessage = 'This e-mail is already registered.';
      } else {
        systemErrorMessage = 'An error ocurred. Please try again later.';
      }
      setLoading(false);
      setError(systemErrorMessage);
    }
  };

  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
    return <Navigate replace to="/about" />;
  };

  //login
  const login = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(false);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let systemErrorMessage;
      if (error.message.includes('user-not-found')) {
        systemErrorMessage = 'User not found';
      } else if (error.message.includes('wrong-password')) {
        systemErrorMessage = 'Wrong Password.';
      } else {
        systemErrorMessage = 'An error ocurred. Please try again later.';
      }
      setLoading(false);
      setError(systemErrorMessage);
    }
  };

  //send reset password to email
  const resetPassword = async (email) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(false);
    try {
      await sendPasswordResetEmail(auth, email);
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      let systemErrorMessage;
      if (error.message.includes('user-not-found')) {
        systemErrorMessage = 'User not found';
      } else {
        systemErrorMessage = 'An error ocurred. Please try again later.';
      }
      setLoading(false);
      setError(systemErrorMessage);
    }
  };

  //reset password
  function ResetPasswordPage(auth, actionCode, continueUrl, lang) {
    // Localize the UI to the selected language as determined by the lang
    // parameter.

    // Verify the password reset code is valid.
    verifyPasswordResetCode(auth, actionCode)
      .then((email) => {
        const accountEmail = email;

        // TODO: Show the reset screen with the user's email and ask the user for
        // the new password.
        const newPassword = '...';

        // Save the new password.
        confirmPasswordReset(auth, actionCode, newPassword)
          .then((resp) => {
            // Password reset has been confirmed and new password updated.
            // TODO: Display a link back to the app, or sign-in the user directly
            // if the page belongs to the same domain as the app:
            // auth.signInWithEmailAndPassword(accountEmail, newPassword);
            // TODO: If a continue URL is available, display a button which on
            // click redirects the user back to the app via continueUrl with
            // additional state determined from that URL's parameters.
          })
          .catch((error) => {
            // Error occurred during confirmation. The code might have expired or the
            // password is too weak.
          });
      })
      .catch((error) => {
        // Invalid or expired action code. Ask user to try to reset the password
        // again.
      });
  }

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
    resetPassword,
    success,
  };
};
