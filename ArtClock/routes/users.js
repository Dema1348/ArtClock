var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/users', function(req, res, next) {
  res.render('users', { title: 'ArtClock' });
});

module.exports = router;
