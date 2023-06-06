import { NavLink } from 'react-router-dom';

import { useAuthentication } from '../../hooks/useAuthentication';
import { useAuthValue } from '../../context/AuthContext';
import styles from './Navbar.module.css';
import logo from './cfu_logo.png';
import logoMedium from './coding_w_out_bird_medium.png';

import P from 'prop-types';
import { useLocation } from 'react-router-dom';
import LessonsSidebar from './LessonsSidebar';
import { logoMain } from './logo-cfu-navmain';
import { LogoCfuBox } from './cfu_logo_box';

const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  const location = useLocation();

  if (!location.pathname.includes('lesson')) {
    return (
      <nav className="navbar navbar-expand-lg nav_main bg-white shadow">
        <div className="container">
          <NavLink to="/" className="navbar-brand py-0">
            {/* <img src={logoMedium} className={styles.logo}></img> */}
            <LogoCfuBox />
          </NavLink>
          <button
            className="navbar-toggler border-secondary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse flex-grow-1 text-right"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto flex-nowrap d-flex align-items-lg-center my-4 my-lg-2">
              {!user && (
                <li className="nav-item px-3 py-2">
                  <NavLink
                    to="/"
                    className={
                      ('nav-link',
                      ({ isActive }) => (isActive ? styles.active : ''))
                    }
                  >
                    Home
                  </NavLink>
                </li>
              )}

              {!user && (
                <>
                  <li className="nav-item px-3 py-2">
                    <NavLink
                      to="/login"
                      className={
                        ('nav-link',
                        ({ isActive }) => (isActive ? styles.active : ''))
                      }
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item px-3 py-2">
                    <NavLink
                      to="/register"
                      className={
                        ('nav-link',
                        ({ isActive }) => (isActive ? styles.active : ''))
                      }
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
              {user && (
                <>
                  <li className="nav-item px-3 py-2">
                    <NavLink
                      to="/myhome"
                      className={
                        ('nav-link',
                        ({ isActive }) => (isActive ? styles.active : ''))
                      }
                    >
                      My Home
                    </NavLink>
                  </li>
                  {user.uid === 'B6BPdCJgzicvHTKvg7sRz1wJOZx1' && (
                    <li className="nav-item px-3 py-2">
                      <NavLink
                        to="/posts/create"
                        className={
                          ('nav-link',
                          ({ isActive }) => (isActive ? styles.active : ''))
                        }
                      >
                        Create Lesson
                      </NavLink>
                    </li>
                  )}
                  {user.uid === 'B6BPdCJgzicvHTKvg7sRz1wJOZx1' && (
                    <li className="nav-item px-3 py-2">
                      <NavLink
                        to="/dashboard"
                        className={
                          ('nav-link',
                          ({ isActive }) => (isActive ? styles.active : ''))
                        }
                      >
                        Dashboard
                      </NavLink>
                    </li>
                  )}
                </>
              )}
              <li className="nav-item px-3 py-2">
                <NavLink
                  to="/about"
                  className={
                    ('nav-link',
                    ({ isActive }) => (isActive ? styles.active : ''))
                  }
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item px-3 py-2">
                <NavLink
                  to="/donate"
                  className={
                    ('nav-link',
                    ({ isActive }) =>
                      isActive
                        ? `${styles.active} btn rounded-pill donate_button`
                        : 'btn rounded-pill donate_button')
                  }
                >
                  Donate
                </NavLink>
              </li>
              {user && (
                <li className="nav-item px-3 py-2">
                  <button onClick={logout}>Logout</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  } else {
    const idModuleP = location.pathname.split('/')[2];
    const idSectionP = location.pathname.split('/')[3];
    // console.log(
    //   '0:',
    //   location.pathname.split('/')[0],
    //   '1:',
    //   location.pathname.split('/')[1],
    //   '2:',
    //   location.pathname.split('/')[2],
    //   '3:',
    //   location.pathname.split('/')[3],
    //   '4:',
    //   location.pathname.split('/')[4],
    // );
    return <LessonsSidebar moduleSlug={idModuleP} sectionSlug={idSectionP} />;
  }
};

Navbar.propTypes = {
  props: P.string,
};

export default Navbar;
