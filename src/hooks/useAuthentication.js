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
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';

import { useState, useEffect } from 'react';

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [systemMessageReturn, setSystemMessageReturn] = useState(null);
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

  //register
  // const createUser = async (data) => {
  //   checkIfIsCancelled();

  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const { user } = await createUserWithEmailAndPassword(
  //       auth,
  //       data.email,
  //       data.password,
  //     );
  //     await updateProfile(user, {
  //       displayName: data.displayName,
  //     });

  //     // Send welcome email
  //     const transporter = nodemailer.createTransport({
  //       host: 'https://www.google.com/settings/security/lesssecureapps',
  //       port: 465,
  //       secure: true,
  //       auth: {
  //         user: 'tavaressheila',
  //         pass: 'password',
  //       },
  //     });

  //     await transporter.sendMail({
  //       from: 'admin@example.com',
  //       to: data.email,
  //       subject: 'Welcome to our app!',
  //       text: `Hello ${data.displayName}, welcome to our app!`,
  //     });

  //     setLoading(false);
  //     return user;
  //   } catch (error) {
  //     console.log(error.message);
  //     console.log(typeof error.message);

  //     let systemErrorMessage;

  //     if (error.message.includes('Password')) {
  //       systemErrorMessage =
  //         'Your password must contain at least 6 characters.';
  //     } else if (error.message.includes('email-already')) {
  //       systemErrorMessage = 'This e-mail is already registered.';
  //     } else {
  //       systemErrorMessage = 'An error ocurred. Please try again later.';
  //     }
  //     setLoading(false);
  //     setError(systemErrorMessage);
  //   }
  // };

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

  //update Display name
  const updateDisplayName = (name) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(false);

    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        setLoading(false);
        setSystemMessageReturn('Your display name was updated.');
      })
      .catch((error) => {
        let systemErrorMessage = 'An error ocurred. Please try again later.';

        setLoading(false);
        setSystemMessageReturn(systemErrorMessage);
      });
    console.log(success);
    console.log(error);
  };

  //update Email
  const changeEmail = async (email, currentPassword) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(false);

    const user = auth.currentUser;

    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword,
    );

    reauthenticateWithCredential(user, credential)
      .then(async () => {
        try {
          await updateEmail(user, email);
          setLoading(false);
          setSystemMessageReturn('Your email was updated.');
        } catch (error) {
          let systemErrorMessage = 'An error occurred. Please try again later.';
          let userErrorMessage =
            error.code === 'auth/wrong-password'
              ? 'Incorrect current password. Please try again.'
              : error.code === 'auth/email-already-in-use'
              ? 'This email address is already in use. Please choose another.'
              : systemErrorMessage;

          setLoading(false);
          setSystemMessageReturn(userErrorMessage);
        }
      })
      .catch((error) => {
        let systemErrorMessage = 'An error occurred. Please try again later.';
        let userErrorMessage = 'Incorrect current password. Please try again.';

        setLoading(false);
        setSystemMessageReturn(
          error.code === 'auth/wrong-password'
            ? userErrorMessage
            : systemErrorMessage,
        );
        // console.log('nao deu certo');
      });
  };

  //update Password
  const changePassword = async (newPassword, currentPassword) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(false);

    const user = auth.currentUser;

    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword,
    );

    reauthenticateWithCredential(user, credential)
      .then(async () => {
        try {
          await updatePassword(user, newPassword);
          setLoading(false);
          setSystemMessageReturn('Your password was updated.');
        } catch (error) {
          let systemErrorMessage = 'An error occurred. Please try again later.';
          let userErrorMessage =
            error.code === 'auth/wrong-password'
              ? 'Incorrect current password. Please try again.'
              : systemErrorMessage;

          setLoading(false);
          setSystemMessageReturn(userErrorMessage);
        }
      })
      .catch((error) => {
        let systemErrorMessage = 'An error occurred. Please try again later.';
        let userErrorMessage = 'Incorrect current password. Please try again.';

        setLoading(false);
        setSystemMessageReturn(
          error.code === 'auth/wrong-password'
            ? userErrorMessage
            : systemErrorMessage,
        );
        // console.log('nao deu certo');
      });
  };

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
    updateDisplayName,
    changeEmail,
    systemMessageReturn,
    changePassword,
  };
};
