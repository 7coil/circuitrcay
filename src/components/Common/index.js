import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import styles from './index.module.scss';

class Common extends React.Component {
  render() {
    return (
      <div className={styles.window}>
        <Header />
        <div className={styles.content}>
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Common;