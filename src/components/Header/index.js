import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAuth, removeAuth } from '../../redux/actions/auth';
import styles from './index.module.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAuth());
  }
  logout() {
    const { dispatch } = this.props;
    dispatch(removeAuth());
  }
  render() {
    const { data } = this.props.auth
    return (
      <header className={styles.header}>
        <h1 className={styles.title}><Link to="/">CircuitRCAY</Link></h1>
        {
          data ?
            <>
              <Link to="/home"><h2 className={styles.headerLink}>Home</h2></Link>
              <a href="#"><h2 className={styles.headerLink} onClick={this.logout}>Log Out</h2></a>
            </> :
            <Link to="/login"><h2 className={styles.headerLink}>Log In</h2></Link>
        }
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth }
}

export default connect(mapStateToProps)(Header);
