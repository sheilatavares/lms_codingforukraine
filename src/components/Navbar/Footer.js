import React from 'react';
import styles from './Footer.module.css';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  if (!location.pathname.includes('lesson')) {
    return (
      <footer
        className={`container-full px-lg-5 ${
          location.pathname === '/' ? styles.homeFooter : null
        }`}
      >
        <div className="py-4 mt-lg-4 container">
          <div className="row">
            <div className="col-6 d-flex justify-content-start">
              <small className="text-white">
                &copy; 2023 Coding for Ukraine
              </small>
            </div>
            <div className="col-6 d-flex justify-content-end align-items-end">
              <a
                href="https://twitter.com/codingukraine"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className={styles.iconSocialMedia}
                  src="https://firebasestorage.googleapis.com/v0/b/coding-for-ukraine.appspot.com/o/twitter.svg?alt=media&token=3b2116ce-b210-41d2-be47-c6c770e2ef64&_gl=1*scw2oa*_ga*MjAxNzU0MTM0LjE2ODUzODUyNTQ.*_ga_CW55HF8NVT*MTY4NTk3OTkyNS45LjEuMTY4NTk4MDE5Ni4wLjAuMA.."
                ></img>
              </a>
              <a
                href="https://www.youtube.com/channel/UCVLYePMVyyKNWwALdRSG81g"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className={styles.iconSocialMedia}
                  src="https://firebasestorage.googleapis.com/v0/b/coding-for-ukraine.appspot.com/o/youtube.svg?alt=media&token=14d2c330-37da-498b-a740-77f216befb6e&_gl=1*u8gung*_ga*MjAxNzU0MTM0LjE2ODUzODUyNTQ.*_ga_CW55HF8NVT*MTY4NTk3OTkyNS45LjEuMTY4NTk3OTk2Mi4wLjAuMA.."
                ></img>
              </a>
              <a href="#" target="_blank">
                <img
                  className={styles.iconSocialMedia}
                  src="https://firebasestorage.googleapis.com/v0/b/coding-for-ukraine.appspot.com/o/linkedin.svg?alt=media&token=b73a5cb9-bd37-412d-a931-bdc84238b3ce&_gl=1*1u5sjp9*_ga*MjAxNzU0MTM0LjE2ODUzODUyNTQ.*_ga_CW55HF8NVT*MTY4NTk3OTkyNS45LjEuMTY4NTk4MDE0Ni4wLjAuMA.."
                ></img>
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
};

export default Footer;
