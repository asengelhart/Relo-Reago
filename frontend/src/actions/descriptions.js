import API from '../helpers/API'

export function changeDescriptionVotes(description, voteChange=0) {
  return (dispatch) => {
    dispatch({type: 'LOAD_DESCRIPTIONS'});
    let postObj = API.changeVotesObj(description, voteChange);
    API.fetchPost(`descriptions/${description.id}`, postObj, (description) => dispatch({type: 'UPDATE_DESCRIPTION', description}));
  }
}

export function postDescription(description) {
  return (dispatch) => {
    dispatch({type: 'LOAD_DESCRIPTIONS'});
    let postObj = API.postObj(description);
    API.fetchPost('descriptions', postObj, (description) => {
      if(description.id) {
        return dispatch({type: 'ADD_ONE_TRANSLATION', description});
      } else {
        if(description.message) {
          alert(description.message)
        } else {
          alert(`Could not post description. \nNe eblis afiŝi priskribon.`);
        }
        return dispatch({type: 'NO_CHANGE'});
      }
    });
  }
}