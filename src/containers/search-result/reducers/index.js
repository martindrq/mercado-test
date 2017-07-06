
const resultReducer = (state = {}, action) => {
  switch (action.type) {
    case 'QUERY_PRODUCTS':
      return {
        ...state,
        fetching: true

      };
    case 'RECEIVE_PRODUCTS':
      return {
        ...state,
        products: action.products,
        fetching: false
      };
    default:
      return state;
  }
}


export default resultReducer;
