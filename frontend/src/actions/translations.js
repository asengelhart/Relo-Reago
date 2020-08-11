import addDiacritics from '../helpers/addDiacritics';
import API from '../helpers/API';

export function fetchTranslations({lang, word}) {
  return (dispatch) => {
    dispatch({type: 'LOAD_TRANSLATIONS'});
    let queryWord = addDiacritics(word.toLowerCase());
    let url = new URL('http://localhost:3000/translations');
    url.search = new URLSearchParams({lang, word: queryWord});
    return fetch(url.toString())
    .then(r => {
      if(!r.ok) {Promise.reject(r.statusText)};
      return r.json();
    })
    .then((translations) => {
      if(translations && !translations.message) {
        dispatch({type: 'ADD_TRANSLATIONS', translations});
        return translations;
      } else {
        if(translations.message) {
          alert(translations.message)
        } 
        dispatch({type: 'ADD_TRANSLATIONS', translations: null})
      }
    })
    .catch(err => {
      alert(err.message);
      dispatch({type: 'NO_CHANGE'});
    });
  }
}

export function fetchOneTranslation(id) {
  return (dispatch) => {
    dispatch({type: 'LOAD_TRANSLATIONS'});
    let url = API.path(`translations/${id}`);
    return fetch(url.toString())
    .then(r => {
      if(!r.ok) {Promise.reject(r.statusText)};
      return r.json()
    })
    .then((translation) => {
      if(translation.id) {
        dispatch({type: 'ADD_ONE_TRANSLATION', newTranslation: translation});
        return translation;
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
      console.log(error)
      alert(error.message);
      dispatch({type: 'NO_CHANGE'})
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
    let url = API.path(`translations/${translation.id}`);
    fetch(url, postObj)
    .then(r => r.json())
    .then(translation => dispatch({type: 'UPDATE_TRANSLATION', translation}))
  }
}