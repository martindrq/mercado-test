const apiSearchService = require('../components/api-search-service');


exports.get = async (req, res) => {
    try{
      const itemInformation = await apiSearchService.getItemInformation(req.params.id);
      res.json(itemInformation);
    }catch(e){
      res.sendStatus(500);
      throw e;
    }
};

exports.query = async (req, res) => {
    try{
      const itemsInformation = await apiSearchService.queryItemsInformation(req.query.search);
      res.json(itemsInformation);
    }catch(e){
      res.sendStatus(500);
      throw e;
    }
};
