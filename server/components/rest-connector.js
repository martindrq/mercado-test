const request = require('request-promise');

module.exports = (requestOptions) => {
    let customParams = {};

    if(typeof requestOptions === 'string'){
        customParams.uri = requestOptions;
    }else if(typeof requestOptions === 'object'){
        customParams = Object.assign({},customParams,requestOptions);
    }else{
      throw new Error("Rest conenctor: invalid arguments");
    }

    return request(Object.assign({
      headers: {
          'Content-type': 'application/json'
      },
      json: true
    }, customParams)
  );
}
