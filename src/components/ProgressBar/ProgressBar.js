import React, { useState, useEffect } from 'react';
import styles from './ProgressBar.module.css';
import P from 'prop-types';

const ProgressBar = ({ done }) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    setTimeout(() => {
      const newStyle = {
        opacity: 1,
        width: `${done < 10 ? 10 : done}%`,
      };

      setStyle(newStyle);
    }, 200);
  }, [done]);

  return (
    <div className={styles.progress}>
      <div className={styles.progressDone} style={style}>
        {done}%
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  done: P.string,
};

export default ProgressBar;
