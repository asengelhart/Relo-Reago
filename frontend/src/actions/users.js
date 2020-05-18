import API from '../helpers/API'

async function submit_user(name, password, cb) {
  return (dispatch) => {
    dispatch({type: 'LOAD_USER'});
    let postObj = API.postObj({name, password});
    API.fetchPost('login', postObj, (user) => {cb(dispatch, user)});
  }
}

export function login(name, password) {
  return submit_user(name, password, (dispatch, user) => {
    if(user.id) {
      return dispatch({type: 'LOGIN', user});
    } else {
      alert("Login failed, try again. \nEnsaluti malsukcesis, provu denove.");
      return dispatch({type: 'LOGOUT'});
    }
  })
}

export function logout() {
  return (dispatch) => {
    dispatch({type: 'LOAD_USER'});
    fetch(API.path('logout'))
    .then(r => r.json())
    .then(() => dispatch({type: "LOGOUT"}))
  }
}

export function createUser(name, password) {
  return submit_user(name, password, (dispatch, user) => {
    if(user.id) {
      return dispatch({type: 'LOGIN', user});
    } else {
      if(user.message) {
        alert(user.message);
      } else {
        alert("Could not create new user, try again later. \nNe eblis krei novan uzanton, provu denove alitempe.");
      }
      return dispatch({type: 'NO_CHANGE'});
    }
  })
}