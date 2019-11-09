import { RECEIVE_AUTH, REMOVE_AUTH, REQUEST_AUTH } from '../actions/auth';

function auth(state = {
  fetching: false,
  fetched: false,
  data: null
}, action) {
  switch (action.type) {
    case REQUEST_AUTH:
      return Object.assign({}, state, {
        fetching: true
      });
    case RECEIVE_AUTH:
      return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        data: action.data,
      });
    case REMOVE_AUTH:
      return Object.assign({}, state, {
        data: null
      })
    default:
      return state;
  }
}

export default auth;
