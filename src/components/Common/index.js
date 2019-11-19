import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import styles from './index.module.scss';
import { Helmet } from 'react-helmet';

class Common extends React.Component {
  render() {
    return (
      <div className={styles.window}>
        <Helmet>
          <title>CircuitRCAY</title>
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        </Helmet>
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