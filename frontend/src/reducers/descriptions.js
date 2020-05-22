const DescriptionsReducer = (state={descriptions: [], loading: false}, action) => {
  switch(action.type) {
    case 'LOAD_DESCRIPTION':
      return {
        ...state,
        descriptions: [...state.descriptions],
        loading: true
      }
    case 'ADD_ONE_DESCRIPTION':
      return {
        ...state,
        descriptions: [...state.descriptions, action.descripition],
        loading: false
      }
    case 'UPDATE_DESCRIPTION':
      const idx = state.descriptions.findIndex(description => description.id === action.description.id);
      const newDescriptions = [...state.descriptions.slice(0,idx), action.description, ...state.descriptions.slice(idx + 1)];
      return {
        ...state,
        descriptions: newDescriptions,
        loading: false
      }

    case 'ADD_ONE_TRANSLATION':
      if(action.newTranslation) {
        if(action.newTranslation.descriptions && action.newTranslation.descriptions.length > 0) {
        return {
          ...state,
          descriptions: [...action.newTranslation.descriptions]
        }
      } else {
        return state;
      }
    } else {
      return state;
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

export default DescriptionsReducer;