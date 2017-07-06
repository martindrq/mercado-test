
const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_SEARCH_BOX':
      return {
        ...state,
        text: action.text
      };
    case 'INITIALIZE':
    return {
      ...state,
      text: action.text
    };
    default:
      return state;
  }
}


export default searchReducer;
