import API from '../helpers/API'

function submit_user(name, password, cb) {
  return (dispatch) => {
    dispatch({type: 'LOAD_USER'});
    let postObj = API.postObj({name, password});
    console.log(API);
    API.fetchPost('login', postObj)
    .then(obj => {cb(dispatch, obj)})
  }
}

export function login({name, password}) {
  return (dispatch) => {
    dispatch({type: 'LOAD_USER'});
    let postObj = API.postObj({name, password});
    let path = API.path('login');
    return fetch(path, postObj)
    .then(r => r.json())
    .then(user => {
      if(user.id) {
        dispatch({type: 'LOGIN', user});
      } else {
        alert("Login failed, try again. \nEnsaluti malsukcesis, provu denove.");
        dispatch({type: 'LOGOUT'});
      }
      return !!user.id;
    });
  }
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
      dispatch({type: 'LOGIN', user});
    } else {
      if(user.message) {
        alert(user.message);
      } else {
        alert("Could not create new user, try again later. \nNe eblis krei novan uzanton, provu denove alitempe.");
      }
      dispatch({type: 'NO_CHANGE'});
    }
  })
}

export function checkUser() {
  return (dispatch) => {
    dispatch({type: 'LOAD_USER'});
    const url = API.path('current_user');
    fetch(url)
    .then(r => r.json())
    .then(user => {
      if(user && user.id) {
        dispatch({type: 'LOGIN', user})
      } else {
        dispatch({type: 'LOGOUT'});
      }
    })
    .catch(() => {
      console.log("Current user not found");
      dispatch({type: 'LOGOUT'})
    });
  }
}