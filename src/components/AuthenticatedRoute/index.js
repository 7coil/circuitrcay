import React from 'react';
import { Route, Redirect } from 'react-router-dom';

class AuthenticatedRoute extends React.Component {
  render() {
    const newProps = Object.assign({}, this.props);
    delete newProps.component;

    return (
      <Route {...newProps} render={(props) => {
        const data = localStorage.getItem('data');

        if (!data) {
          return <Redirect to="/login" />
        }

        const Component = this.props.component;
        return <Component />
      }} />
    )
  }
}

export default AuthenticatedRoute;
