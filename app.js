const http = require('http');
const slack = require('@slack/client');
const express = require('express');
const bodyParser = require('body-parser');
const DateHandlerService = require('./services/dateHandlerService');
const config = require('./config.json');
const dateHandlerService = new DateHandlerService();
module.exports = function() {};

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = app.listen(() => { console.log('Express server   listening on port %d in %s mode', server.address().port,   app.settings.env);});

//config.prod.port

app.post('/', (req, res) => {
    let text = req.body.text;
    // implement your bot here ... 

    res.send(dateHandlerService.parseDate(text));
    
});

app.get('/', (req, res) => {
    let dateStr = req.query || {date: moment().format()};

    if (dateStr.date) {

        res.send(dateHandlerService.parseDate(dateStr.date));
    }
});