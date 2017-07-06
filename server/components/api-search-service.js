const config  = require('../config');
const request = require('./rest-connector');

/*
* Get one item and item data
*/
exports.getItemInformation = async itemId => {
  const item = await requestItem(itemId);

  const [
    currency,
    itemDescription,
    category
  ] =  await getItemSubResources({
      currency: true,
      description: true,
      categories : true,
  }, { itemId : itemId, currencyId : item.currency_id, categoryId: item.category_id});

  return {
    item : mapItemInformation({item, itemDescription, currency, category})
  }
}

/*
* Search items and get item data
*/
exports.queryItemsInformation = async query => {
  const queryResult = await requestSearch(query);

  const itemsInformation = queryResult.results.slice(0,4).map(async (item) => {

      const [
        currency
      ] =  await getItemSubResources({
          currency : true
      }, { currencyId : item.currency_id});

      return mapItemInformation({item, currency});
  });

  const items = await Promise.all(itemsInformation);
  const maxCategory = getMaxCategory(queryResult.available_filters);

  return {
    categories : maxCategory && [maxCategory.name],
    items
  }
}


function mapItemInformation({item, itemDescription, currency, category}){
    let resultObject = {};

    if(item){
      resultObject = {
        id: item.id,
        title: item.title,
        price: {
          amount: item.price
        },
        condition: item.condition,
        picture: item.thumbnail,
        free_shipping: item.shipping.free_shipping,
        sold_quantity: item.sold_quantity,
        state_name: item.address && item.address.state_name
      };

      if(itemDescription){
        resultObject.description = itemDescription.text;
      }

      if(currency){
        resultObject.price.currency = currency.symbol;
      }

      if(category){
        resultObject.categories = category.path_from_root.map(c => c.name);
      }
    }

    return resultObject;
}


function getItemSubResources(fetch, {currencyId, itemId, categoryId}){
    const subResources = [];

    if(fetch.currency){
      subResources.push(requestCurrency(currencyId));
    }

    if(fetch.description){
        subResources.push(requestItemDescription(itemId));
    }

    if(fetch.categories){
      subResources.push(requestCategories(categoryId));
    }

    return Promise.all(subResources);
}

function requestSearch(query){
  return request(`${config.api.endpoint}/sites/MLA/search?q=${query}`);
}

function requestItem(itemId){
  return request(`${config.api.endpoint}/items/${itemId}`);
}

function requestItemDescription(itemId){
  return request(`${config.api.endpoint}/items/${itemId}/description`);
}

function requestUser(userId){
    return request(`${config.api.endpoint}/users/${userId}`);
}

function requestCurrency(currencyId){
    return request(`${config.api.endpoint}/currencies/${currencyId}`);
}

function requestCategories(categoryId){
    return request(`${config.api.endpoint}/categories/${categoryId}`);
}

function getMaxCategory(filters){

    if(!Array.isArray(filters)){
        return null;
    }
    const categoryFilter = filters.find(f => f.id == 'category');

    if(!categoryFilter || categoryFilter.length === 0){
      return null;
    }

    const maxCategory = categoryFilter.values.reduce((max, f) => {
        if(f.results > max.results){
            return f;
        }
        return max;
    }, categoryFilter.values[0]);

    return maxCategory;
}
