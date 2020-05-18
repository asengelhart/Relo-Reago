const UsersReducer = (state={currentUser: null, loading: false}, action) => {
  switch(action.type) {
    case 'LOAD_USER':
      return {
        ...state,
        loading: true
      }
    case 'LOGIN':
      return {
        ...state,
        currentUser: action.user,
        loading: false
      }
    case 'LOGOUT':
      return {
        ...state,
        currentUser: null,
        loading: false
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

export default UsersReducer;