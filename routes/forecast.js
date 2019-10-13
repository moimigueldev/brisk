let express = require('express'),
    router = express.Router(),
    request = require('request');

const DARKSKYKEY = process.env.DARKSKYKEY;

router.post('/', (req, res) => {
    const coordinates = req.body.coordinates;
    request.get(`https://api.darksky.net/forecast/${DARKSKYKEY}/${coordinates.lat},${coordinates.lon}`, (err, response, body) => {
        res.send(body)
    })
});

module.exports = router;