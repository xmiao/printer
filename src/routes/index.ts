var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req: any, res: any, next: any) {
    // res.render('index', {title: 'Express'});
    res.json({some: "test eee"});
});

module.exports = router;
