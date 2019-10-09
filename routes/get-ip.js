let express = require('express'),
    router = express.Router(),
    request = require('request');



router.get('/', (req, res) => {
    console.log('ip url hit with request');
});

module.exports = router;