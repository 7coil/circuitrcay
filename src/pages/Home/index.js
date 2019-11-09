import React from 'react';
import { connect } from 'react-redux';
import { fetchAuth } from '../../redux/actions/auth';
import styles from './index.module.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: null,
      machines: null
    }
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAuth())
      .then((data) => {
        fetch('https://laundrymachines.netlify.com/.netlify/functions/fetch/api/user/ReconcileCards', {
          method: 'POST',
          headers: {
            authorization: `bearer ${data.data.Token.Value}`
          }
        })
          .then(res => res.json())
          .then((res) => {
            if (res.Success) {
              this.setState({
                balance: res.Data.AccountBalance.toFixed(2)
              })
            }
          })

        fetch('https://laundrymachines.netlify.com/.netlify/functions/fetch/api/user/LaundryStatus', {
          method: 'GET',
          headers: {
            authorization: `bearer ${data.data.Token.Value}`
          }
        })
          .then(res => res.json())
          .then((res) => {
            if (res.Success) {
              this.setState({
                machines: res.Data
              })
            }
          })
      })
  }
  render() {
    return (
      <main>
        <h1>Home</h1>
        {
          this.props.auth.data && (this.props.auth.data.AccountWelcomeTitle || this.props.auth.data.AccountWelcomeText) &&
          <>
            <h2>Organisational Message</h2>
            <div className={styles.orgMessage}>
              {this.props.auth.data && this.props.auth.data.AccountWelcomeTitle && <h3>{this.props.auth.data.AccountWelcomeTitle}</h3>}
              {this.props.auth.data && this.props.auth.data.AccountWelcomeText && <p>{this.props.auth.data.AccountWelcomeText}</p>}
            </div>
          </>
        }
        <h2>Information</h2>
        <p>{this.props.auth.data ? `Currently logged in as: "${this.props.auth.data.AccountName}"` : 'Loading...'}</p>
        <p>{this.state.balance ? `Your balance is: £${this.state.balance}` : 'Loading...'}</p>
        <h2>Laundry Status</h2>
        {
          this.state.machines ?
            <table className={styles.table}>
              <thead>
                <tr>
                  <td>
                    Name
                  </td>
                  <td>
                    Status
                  </td>
                </tr>
              </thead>
              <tbody>
                {this.state.machines.map(machine => (
                  <tr key={machine.MachineId}>
                    <td>
                      {machine.Name}
                    </td>
                    <td>
                      {machine.EstimatedCompletionTime || machine.StatusText}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> :
            <p>Loading machines...</p>
        }
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth }
}

export default connect(mapStateToProps)(Home);

