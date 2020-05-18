import addDiacritics from '../helpers/addDiacritics';
import API from '../helpers/API';

export function fetchTranslations(lang, word) {
  return (dispatch) => {
    dispatch({type: 'LOAD_TRANSLATIONS'});
    let queryWord = addDiacritics(word.toLowerCase());
    let url = new URL('http://localhost:3000/translations');
    url.search = new URLSearchParams({lang, queryWord});
    fetch(url.toString())
    .then(r => r.json())
    .then((translations) => dispatch({type: 'ADD_TRANSLATIONS', translations}))
  }
}

export function fetchOneTranslation(id) {
  return (dispatch) => {
    dispatch({type: 'LOAD_TRANSLATIONS'});
    let url = API.queryPath('translations', {id})
    fetch(url.toString())
    .then(r => r.json())
    .then((translation) => dispatch({type: 'ADD_ONE_TRANSLATION', newTranslation: translation}))
  }
}

export async function postTranslation(translation) {
  return async (dispatch) => {
    dispatch({type: 'LOAD_TRANSLATIONS'});
    let postBody = {
      ...translation,
      en: translation.en.toLowerCase(),
      eo: addDiacritics(translation.eo.toLowerCase())
    };
    let postObj = API.postObj(postBody);
    await API.fetchPost('translations', postObj, (newTranslation) => dispatch({type: 'ADD_ONE_TRANSLATION', newTranslation}));
  }
}

export async function changeTranslationVotes(translation, voteChange=0) {
  return async (dispatch) => {
    dispatch({type: 'LOAD_TRANSLATIONS'});
    let postObj = API.changeVotesObj(translation, voteChange);
    await API.fetchPost('translations', postObj, (translation) => dispatch({type: 'UPDATE_TRANSLATION', translation}));
  }
}