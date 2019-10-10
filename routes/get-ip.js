let express = require('express'),
    router = express.Router(),
    request = require('request');



router.get('/', (req, res) => {
    console.log('ip url hit with request');

    request.get('https://json.geoiplookup.io/', (err, response, body) => {
        res.send(body)
    })
});

module.exports = router;