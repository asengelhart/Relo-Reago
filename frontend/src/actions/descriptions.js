import API from '../helpers/API'

export async function changeDescriptionVotes(description, voteChange=0) {
  return async (dispatch) => {
    dispatch({type: 'LOAD_DESCRIPTIONS'});
    let postObj = API.changeVotesObj(description, voteChange);
    await API.fetchPost('descriptions', postObj, (description) => dispatch({type: 'UPDATE_DESCRIPTION', description}));
  }
}