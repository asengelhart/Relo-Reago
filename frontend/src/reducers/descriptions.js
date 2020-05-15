const descriptionsReducer = (state={descriptions: [], loading: false}, action) => {
  switch(action.type) {
    case 'LOAD_DESCRIPTION':
      return {
        ...state,
        loading: true
      }
    case 'ADD_ONE_DESCRIPTION':
      return {
        ...state,
        descriptions: [...state.descriptions, action.descripition],
        loading: false
      }
    case 'UPDATE_DESCRIPTION':
      const idx = state.descriptions.findIndex(description => description.id === action.descripition.id);
      const newDescriptions = [...state.descriptions.slice(0,idx), action.description, ...state.descriptions.slice(idx + 1)];
      return {
        ...state,
        descriptions: newDescriptions,
        loading: false
      }

    case 'ADD_ONE_TRANSLATION':
      if(action.translation.descriptions && action.translation.descriptions.length > 0) {
        return {
          ...state,
          descriptions: action.translation.descriptions
        }
      } else {
        return state;
      }
    default:
      return state;
  }
}

export default descriptionsReducer;