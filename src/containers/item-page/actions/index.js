import { get } from '../../../services/products';


export const queryProducts = itemId => {
  return {
    type: 'QUERY_PRODUCT',
    itemId
  }
}

export const recieveProducts = product => {
  return {
    type: 'RECEIVE_PRODUCT',
    product
  }
}

export function fetchProduct(itemId) {
  return async function (dispatch) {
      dispatch(recieveProducts(itemId));
      const result = await get(itemId);
      dispatch(recieveProducts(result.data));
  }
}
