var express = require('express');
var router = express.Router();

let products = []
let siguienteID = 1
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { products });
});

router.post('/productos', async function(req, res, next) {
  let {body : data} = req

  if(data.title == ''|| data.price == ''||data.thumbnail == ''){
    res.render('tabla',  { products, isEmpty: !products.length })
  }else{
    data = { id: siguienteID, ...data }
    products.push(data)
    siguienteID++
    await res.render('tabla', { products, isEmpty: !products.length,tieneImg: !products.thumbnail })
  }
  

});


module.exports = router;