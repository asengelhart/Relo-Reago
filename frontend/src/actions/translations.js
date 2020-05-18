import addDiacritics from '../helpers/addDiacritics';
import API from '../helpers/API';

export function fetchTranslations({lang, word}) {
  return (dispatch) => {
    dispatch({type: 'LOAD_TRANSLATIONS'});
    let queryWord = addDiacritics(word.toLowerCase());
    let url = new URL('http://localhost:3000/translations');
    url.search = new URLSearchParams({lang, word: queryWord});
    fetch(url.toString())
    .then(r => {
      if(!r.ok) {Promise.reject(r.statusText)};
      return r.json();
    })
    .then((translations) => {
      if(translations && !translations.message) {
        return dispatch({type: 'ADD_TRANSLATIONS', translations});
      } else {
        if(translations.message) {
          alert(translations.message)
        } 
        return dispatch({type: 'ADD_TRANSLATIONS', translations: null})
      }
    })
    .catch(err => {
      alert(err.message);
      return dispatch({type: 'NO_CHANGE'});
    });
  }
}

export function fetchOneTranslation(id) {
  return (dispatch) => {
    dispatch({type: 'LOAD_TRANSLATIONS'});
    let url = API.queryPath('translations', {id})
    fetch(url.toString())
    .then(r => {
      if(!r.ok) {Promise.reject(r.statusText)};
      return r.json()
    })
    .then((translation) => {
      if(translation.id) {
        return dispatch({type: 'ADD_ONE_TRANSLATION', newTranslation: translation});
      } else {
        if(translation.message) {
          alert(translation.message);
        } else {
          alert("Translation not found \nTraduko ne troviĝis");
        }
        return dispatch({type: 'NO_CHANGE'});
      }
    })
    .catch(error => {
      alert(error.message);
      return dispatch({type: 'NO_CHANGE'})
    });
  }
}

export function postTranslation(translation) {
  return (dispatch) => {
    dispatch({type: 'LOAD_TRANSLATIONS'});
    let postBody = {
      ...translation,
      en: translation.en.toLowerCase(),
      eo: addDiacritics(translation.eo.toLowerCase())
    };
    let postObj = API.postObj(postBody);
    API.fetchPost('translations', postObj, (newTranslation) => dispatch({type: 'ADD_ONE_TRANSLATION', newTranslation}));
  }
}

export function changeTranslationVotes(translation, voteChange=0) {
  return (dispatch) => {
    dispatch({type: 'LOAD_TRANSLATIONS'});
    let postObj = API.changeVotesObj(translation, voteChange);
    API.fetchPost('translations', postObj, (translation) => dispatch({type: 'UPDATE_TRANSLATION', translation}));
  }
}