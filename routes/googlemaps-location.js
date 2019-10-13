let express = require('express'),
    router = express.Router(),
    request = require('request');

const GOOGLEMAPSAPIKEY=process.env.GOOGLEMAPSAPIKEY;


router.post('/', (req, res) => {
    console.log('googlemaps url hit', GOOGLEMAPSAPIKEY);
    const zipcode = req.body.zipcode;

    request.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=${GOOGLEMAPSAPIKEY}`, (err, response, body) => {
        res.send(body)
    })

    
});

module.exports = router;