var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
  //res.send('this is the about page');
});

module.exports = router;
