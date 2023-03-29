import styles from './Account.module.css';

import P from 'prop-types';

import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';

import { useNavigate, Link } from 'react-router-dom';

const Account = () => {
  const { auth } = useAuthentication();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      // If no user is logged in, redirect to the login page
      navigate('/login');
    } else {
      // If a user is logged in, update the user state with their data
      setUser(auth.currentUser);
    }
  }, [auth.currentUser, navigate]);

  return (
    <>
      <div className="container py-5  h-100">
        <div className="row g-0 d-flex justify-content-center">
          <div className="col-lg-8 bg-white align-self-center p-4">
            <h3 className="text-primary">Account</h3>
            {user && (
              <>
                <div className="row mt-4">
                  <div className="col-4 d-flex align-items-center">
                    <h4>Name</h4>
                    <Link to={'/changeName'} className="ms-4">
                      Change
                    </Link>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">{user.displayName}</div>
                </div>

                <div className="row mt-4">
                  <div className="col-4 d-flex align-items-center">
                    <h4>Email</h4>
                    <Link to={'/changeEmail'} className="ms-4">
                      Change
                    </Link>
                  </div>
                </div>
                <div className="row"></div>
                <div className="row">
                  <div className="col-lg-12">{user.email}</div>
                </div>

                <div className="row mt-4">
                  <div className="col-4 d-flex align-items-center">
                    <h4>Password</h4>
                    <Link to={'/changePassword'} className="ms-4">
                      Change
                    </Link>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">******</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
