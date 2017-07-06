import axios from 'axios';

export function search(text){
  return axios.get(`/api/items?search=${text}`);
}

export function get(itemId){
  return axios.get(`/api/items/${itemId}`);
}
