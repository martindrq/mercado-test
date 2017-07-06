
import queryString from 'query-string';


export function parseQueryString(url){
    if(typeof url !== 'undefined'){
        return queryString.parse(url);
    }
}
