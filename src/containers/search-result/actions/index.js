import { search } from '../../../services/products';

export const goToProduct = (itemId, history) => {
  history.push(`/items/${itemId}`);
  return {
    type: 'GO_TO_PRODUCT',
    itemId
  }
}

export const queryProducts = query => {
  return {
    type: 'QUERY_PRODUCTS',
    query
  }
}

export const recieveProducts = products => {
  return {
    type: 'RECEIVE_PRODUCTS',
    products
  }
}

export function fetchProducts(query) {
  return async function (dispatch) {
      dispatch(queryProducts(query));
      const result = await search(query);
      dispatch(recieveProducts(result.data));
  }
}
