const translationsReducer = (state = {translations: [], loading: false}, action) => {
  switch(action.type) {
    case 'LOAD_TRANSLATIONS':
      return {
        ...state,
        translations: [...state.translations],
        loading: true
      }
    case 'ADD_TRANSLATIONS':
      return {
        ...state,
        translations: action.translations,
        loading: false
      }
    case 'CREATE_TRANSLATION':
      return {
        ...state,
        translations: [...state.translations, action.newTranslation],
        loading: false
      }
    default:
      return state;
  }
}