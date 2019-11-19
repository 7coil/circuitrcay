import React from 'react';
import { connect } from 'react-redux';
import { fetchAuth } from '../../redux/actions/auth';
import styles from './index.module.scss';
import Common from '../../components/Common';
import moment from 'moment';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: null,
      machines: null,
      alarms: [],
      notifications: false,
    }
    this.machineIdField = React.createRef();
    this.activateMachine = this.activateMachine.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.updateMachine = this.updateMachine.bind(this);
    this.notifyMe = this.notifyMe.bind(this);
    this.fetchInterval = null;
    this.updateTimeInterval = null;
  }
  componentWillUnmount() {
    if (this.fetchInterval) clearInterval(this.fetchInterval)
    if (this.updateTimeInterval) clearInterval(this.updateTimeInterval)
  }
  fetchData(credentials) {
    fetch('https://laundrymachines.netlify.com/.netlify/functions/fetch/api/user/ReconcileCards', {
      method: 'POST',
      headers: {
        authorization: `bearer ${credentials.data.Token.Value}`
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
        authorization: `bearer ${credentials.data.Token.Value}`
      }
    })
      .then(res => res.json())
      .then((res) => {
        if (res.Success) {
          const newMachines = res.Data.map(this.updateMachine);

          newMachines.push({
            "MachineId": "ABCDEFGH",
            "MachineInUseID": 0,
            "Available": true,
            "StatusDescription": "Available",
            "Category": "Washing Machines",
            "EstimatedCompletionTime": "2019-11-19T15:18:00.0685314Z",
            "HighSuggestedCreditAmount": 800,
            "LowSuggestedCreditAmount": 10,
            "Make": "Townsend Corporation",
            "Model": "Townsend 4000",
            "Name": "Test Washer",
            "Status": 1,
            "StatusText": "Available",
            "AccountExternalKey": "ABCDEFGH",
            "LocationId": "ABCDEFGH",
            "OperatorExternalKey": "ABCDEFGH",
            "rcayTimeRemaining": null
          })

          this.setState({
            machines: newMachines
          })
        }
      })
  }
  updateMachine(machine) {
    if (machine.EstimatedCompletionTime) {
      const then = moment(machine.EstimatedCompletionTime);
      const now = moment.now();

      if (then.diff(now) < 0) {
        machine.rcayTimeRemaining = "Finishing up...";

        if (!this.state.alarms.includes(machine.MachineId)) {
          this.setState(oldState => ({
            alarms: [machine.MachineId, ...oldState.alarms]
          }));

          try {
            new Notification('Your Laundry is done!', {
              body: `${machine.Name} has finished!`
            });
          } catch (e) {
            navigator.serviceWorker.ready.then((reg) => {
              reg.showNotification('Your Laundry is done!', {
                body: `${machine.Name} has finished!`
              })
            })
          }
        }
      } else {
        const remaining = moment.utc(then.diff(now));
        machine.rcayTimeRemaining = remaining.format('HH:mm:ss');
      }
    } else {
      machine.rcayTimeRemaining = null;
    }

    return machine;
  }
  updateTime() {
    if (Array.isArray(this.state.machines)) {
      // Update the times of each washer
      this.setState((oldState) => {
        const newMachines = oldState.machines.map(this.updateMachine);

        return {
          machines: newMachines
        };
      })
    }
  }
  componentDidMount() {
    if (Notification.permission === 'granted') {
      this.setState({
        notifications: true
      })
    }

    const { dispatch } = this.props;
    dispatch(fetchAuth())
      .then((data) => {
        this.fetchData(data);
        this.updateTime();
        this.fetchInterval = setInterval(() => {
          this.fetchData(data);
        }, 10000)
        this.updateTimeInterval = setInterval(() => {
          this.updateTime();
        }, 30)
      })
  }
  activateMachine(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(fetchAuth())
      .then((data) => {
        const id = this.machineIdField.current.value;
        fetch(`https://laundrymachines.netlify.com/.netlify/functions/fetch/api/user/CreateVirtualCard?machineId=${id}`, {
          method: 'POST',
          headers: {
            authorization: `bearer ${data.data.Token.Value}`
          }
        })
          .then(res => res.json())
          .then((res) => {
            if (res.Success) {
              console.log("Success!")
            }
            console.log(res)
          })
      })
  }
  notifyMe(e) {
    if (!('Notification' in window)) {
      console.error('Notification not found');
      return;
    }

    console.log('Asking!');
    if (Notification.permission === 'granted') {
      this.setState({
        notifications: true
      })
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission()
        .then((permission) => {
          if (permission === 'granted') {
            this.setState({
              notifications: true
            })
          }
        })
    }
  }
  render() {
    return (
      <Common>
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
                      {machine.rcayTimeRemaining || machine.StatusText}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> :
            <p>Loading machines...</p>
        }
        <h2>Configuration</h2>
        <button onClick={this.notifyMe} disabled={this.state.notifications}>Allow Notifications</button>
        <h2>Activate Machine</h2>
        <form onSubmit={this.activateMachine}>
          <input ref={this.machineIdField}></input>
          <button>Submit</button>
        </form>
      </Common>
    )
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth }
}

export default connect(mapStateToProps)(Home);

