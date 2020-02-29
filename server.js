require('dotenv').config()
const express = require('express');
path = require('path'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    port = process.env.PORT || 3000;

const findIp = require('./routes/get-ip'),
    googlemapslocation = require('./routes/googlemaps-location'),
    forecast = require('./routes/forecast');

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/brisk')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const index = require('./routes/index');


app.use('/', index);
app.use('/api/findIp', findIp);
app.use('/api/googlemapslocation/', googlemapslocation);
app.use('/api/forecast/', forecast);

app.listen(port, () => {
    console.log(`listening on ports: ${port}`);

}); 