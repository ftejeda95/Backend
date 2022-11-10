const { query } = require('express');
const express = require('express');
const router = express.Router();
const knex = require('../../db/index')


router.get('/', async function(req, res, next) {
    let products = knex.getProdutsTest()
    console.log(products)
    res.render('tabla', { products, isEmpty: !products.length,tieneImg: !products.thumbnail })    
      
     });


module.exports = router;