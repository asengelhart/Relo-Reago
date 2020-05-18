const TranslationsReducer = (state = {translations: [], loading: false, error: null}, action) => {
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

    case 'UPDATE_TRANSLATION':
      const idx = state.translations.findIndex((item) => item.id === action.translation.id);
      if(idx === -1) {
        return {...state, loading: false};
      } else {
        const newTranslations = [...state.translations.slice(0,idx), action.translation, state.translations.slice(idx + 1)];
        return {
          ...state,
          translations: newTranslations,
          loading: false
        }
      }
        
    case 'ADD_ONE_TRANSLATION':
      if(state.translations.find(item => item.id === action.newTranslation.id)) {
        return {...state, loading: false}
      } else {
        return {
          ...state,
          translations: [...state.translations, action.newTranslation],
          loading: false
        }
      }

    case 'NO_CHANGE':
      return {
        ...state,
        loading: false
      }

    default:
      return state;
  }
}

export default TranslationsReducer;