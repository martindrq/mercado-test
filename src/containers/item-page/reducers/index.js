
const resultReducer = (state = {}, action) => {
  switch (action.type) {
    case 'QUERY_PRODUCT':
      return {
        ...state,
        itemId: action.itemId
      };
    case 'RECEIVE_PRODUCT':
      return {
        ...state,
        product: action.product
      }
    default:
      return state;
  }
}


export default resultReducer;
