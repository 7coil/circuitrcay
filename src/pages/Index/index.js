import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAuth } from '../../redux/actions/auth';
import Common from '../../components/Common';

class Index extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAuth())
  }
  render() {
    const { data } = this.props.auth

    return (
      <Common>
        <h1>Circuit Remote Access Control (Yves)</h1>
        <p>
          Welcome to the CircuitRCAY interface. You can track your laundry via the website instead of a terrible Android or Apple iOS application.
        </p>
        {
          data ?
            <Link to="/home">View Laundry</Link> :
            <Link to="/login">Log In</Link>
        }
      </Common>
    )
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth }
}

export default connect(mapStateToProps)(Index);

