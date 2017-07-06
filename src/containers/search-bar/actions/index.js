
export const searchProduct = (text, history) => {
  history.push(`/items?search=${text}`);
  return {
    type: 'SEARCH_PRODUCT',
    text
  }
}

export const changeSearch = (text) => {
  return {
    type: 'CHANGE_SEARCH_BOX',
    text
  }
}

export const initialize = (text) => {
  return {
    type: 'INITIALIZE',
    text
  }
}
