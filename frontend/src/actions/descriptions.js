import API from '../helpers/API'

export function changeDescriptionVotes(description, voteChange=0) {
  return (dispatch) => {
    dispatch({type: 'LOAD_DESCRIPTIONS'});
    let patchObj = API.changeVotesObj(description, voteChange);
    let path = API.path(`descriptions/${description.id}`)
    return fetch(path, patchObj)
    .then(r => r.json()) 
    .then((description) => {
      dispatch({type: 'UPDATE_DESCRIPTION', description});
      return description;
    });
  }
}

export function postDescription(description) {
  return (dispatch) => {
    dispatch({type: 'LOAD_DESCRIPTIONS'});
    let postObj = API.postObj(description);
    let url = API.path('descriptions');
    return fetch(url, postObj)
    .then(r => {
      if(!r.ok) {return Promise.reject(r.statusText)}
      return r.json()
    })
    .then(description => {
      console.log(description)
      if(description && description.id) {
        dispatch({type: 'ADD_ONE_DESCRIPTION', description});
        return description
      } else {
        if(description.message) {
          alert(description.message)
        } else {
          alert(`Could not post description. \nNe eblis afiŝi priskribon.`);
        }
        return dispatch({type: 'NO_CHANGE'});
      }
    })
    .catch(error => {
      console.log(error)
      alert(error.message)
    });
  }
}