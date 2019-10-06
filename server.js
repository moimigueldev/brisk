require('dotenv').config()
const express = require('express');
    path = require('path'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    port = process.env.PORT || 4000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
    

const index = require('./routes/index');


app.use('/', index);

app.listen(port, () => {
    console.log(`listening on ports: ${port}`);
    
});