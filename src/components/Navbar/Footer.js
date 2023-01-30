import React from 'react';
import styles from './Footer.module.css';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  if (!location.pathname.includes('lesson')) {
    return (
      <footer className="my-5 position-relative">
        <small className="text-white">Coding for Ukraine &copy; 2023</small>
      </footer>
    );
  }
};

export default Footer;
