import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAuthWithCredentials, fetchAuth } from '../../redux/actions/auth';
import Common from '../../components/Common';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.username = React.createRef();
    this.password = React.createRef();
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAuth())
  }
  login(e) {
    const { dispatch } = this.props;
    dispatch(fetchAuthWithCredentials(this.username.current.value, this.password.current.value));
    e.preventDefault();
  }
  render() {
    if (this.props.auth.data) {
      console.log(this.props.auth.data)
      return (
        <Redirect to="/home" />
      )
    }
    return (
      <Common>
        <h1>CircuitRCAY</h1>
        <h2>Please login with your "Circuit Managed Laundry Systems" credentials.</h2>
        <form onSubmit={this.login}>
          <input placeholder="Username" ref={this.username} required></input>
          <input type="password" placeholder="Password" ref={this.password} required></input>
          <button>Login</button>
        </form>
        <h2>Other Options</h2>
        <h3>Forgotten Password, Sign Up</h3>
        <p>
          Please use the official "Circuit Managed Laundry Systems" mobile application
        </p>
      </Common>
    )
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth }
}

export default connect(mapStateToProps)(LogIn);
