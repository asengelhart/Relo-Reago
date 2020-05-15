import addDiacritics from '../helpers/addDiacritics'

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

export function postTranslation(newTranslation) {
  return (dispatch) => {
    dispatch({type: 'LOAD_TRANSLATIONS'});
    let postObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      credentials: "include",
      body: {
        ...newTranslation,
        en: newTranslation.en.toLowerCase(),
        eo: addDiacritics(newTranslation.eo.toLowerCase())
      }
    }
    fetch('http://localhost:3000', postObj)
    .then(r => r.json())
    .then(translation => dispatch({type: 'CREATE_TRANSLATION', newTranslation: translation}));
  }
}