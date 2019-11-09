export const REQUEST_AUTH = 'REQUEST_AUTH';
export const RECEIVE_AUTH = 'RECEIVE_AUTH';
export const REMOVE_AUTH = 'REMOVE_AUTH';

const requestAuth = () => {
  return {
    type: REQUEST_AUTH
  }
}

const recieveAuth = (data) => {
  return {
    type: RECEIVE_AUTH,
    data
  }
}

const fetchAuth = () => (dispatch) => new Promise((resolve, reject) => {
  dispatch(requestAuth())
  const existingData = localStorage.getItem('data');
  resolve(dispatch(recieveAuth(JSON.parse(existingData))))
})

const fetchAuthWithCredentials = (username, password) => (dispatch) => {
  const authenticateURL = new URL('https://laundrymachines.netlify.com/.netlify/functions/fetch/api/user/authenticate');
  authenticateURL.searchParams.append('email', username);
  authenticateURL.searchParams.append('password', password.substr(0, 64));

  dispatch(requestAuth());
  return fetch(authenticateURL, {
    method: 'POST'
  })
    .then(res => res.json())
    .then((res) => {
      if (res.Success) {
        localStorage.setItem('data', JSON.stringify(res.Data));
        dispatch(recieveAuth(res.Data));
      }
    })
}

const removeAuth = () => {
  localStorage.removeItem('data');
  return {
    type: REMOVE_AUTH
  }
}

export { fetchAuth, removeAuth, fetchAuthWithCredentials };

