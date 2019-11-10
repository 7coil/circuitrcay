import React from 'react';
import styles from './index.module.scss';

class Footer extends React.Component {
  render() {
    return (
      <footer className={styles.footer}>
        <p>Circuit Remote Access Control (Yves) - Copyright 2019</p>
        <p>
          This software is not affiliated with Circuit Managed Laundry Systems.
          Never enter your credentials without making sure it is safe.
        </p>
        <ul>
          <li><a href="https://circuitrcay.com/">CircuitRCAY.com</a></li>
          <li><a href="https://github.com/7coil/circuitrcay">CircuitRCAY on GitHub</a></li>
        </ul>
      </footer>
    )
  }
}

export default Footer;