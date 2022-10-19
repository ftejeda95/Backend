const express = require('express');
const router = express.Router();
const knex = require('../../db/index')

let products = knex.getProducts()


router.get('/', function(req, res, next) {
  res.render('index', { products });
});

router.post('/productos', async function(req, res, next) {
  let {body : data} = req

  if(data.title == ''|| data.price == ''||data.thumbnail == ''){
     res.render('tabla',  { products, isEmpty: !products.length })
  }else{
    await knex.insertProducts(data)
     res.render('tabla', { products, isEmpty: !products.length,tieneImg: !products.thumbnail })
  }
});


module.exports = router;