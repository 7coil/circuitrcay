import React from 'react';
import styles from './index.module.scss';

class Footer extends React.Component {
  render() {
    return (
      <footer className={styles.footer}>
        <p>Circuit Remote Access Control <a href="https://www.youtube.com/watch?v=LIDe-yTxda0">(Yves)</a> - Copyright 2019</p>
        <p>
          This software is not affiliated with Circuit Laundrette Services Ltd., or CircuitRCAY (the person).
          Never enter your credentials without making sure it is safe.
        </p>
        <ul>
          <li><a href="https://circuit.co.uk/">circuit.co.uk</a></li>
          <li><a href="https://circuitrcay.com/">circuitrcay.com</a></li>
          <li><a href="https://github.com/circuitcodes">github.co.uk/circuitcodes</a></li>
          <li><a href="https://github.com/7coil/circuitrcay">github.com/7coil/circuitrcay</a></li>
        </ul>
      </footer>
    )
  }
}

export default Footer;