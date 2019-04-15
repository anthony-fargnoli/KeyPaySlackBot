const http = require('http');
const slack = require('@slack/client');
const express = require('express');
const bodyParser = require('body-parser');
const DateHandlerService = require('./services/dateHandlerService');
const config = require('./config.json');
const dateHandlerService = new DateHandlerService();
module.exports = function() {};

const app = express();

process.env.PORT = process.env.PORT || config.dev.port;
const port = +process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(port, () => { console.log('Express server   listening on port %d in %s mode', server.address().port,   app.settings.env)});

app.post('/', (req, res) => {
    let text = req.body.text;
    // implement your bot here ... 

    res.send(dateHandlerService.parseDate(text));
    
});

app.get('/', (req, res) => {
    let dateStr = req.query || {date: moment().format()};

    if (!dateStr.date) {
        res.send("I need a Date");
        return;
    }
    
    res.send(dateHandlerService.parseDate(dateStr.date));
    
});