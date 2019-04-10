const http = require('http');
const slack = require('@slack/client');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = app.listen(8081, () => { console.log('Express server   listening on port %d in %s mode', server.address().port,   app.settings.env);});

// app.post('/', (req, res) => {
//     let text = req.body.text;
//     // implement your bot here ... 
//     res.send('derp!');
// });

app.get('/', (req, res) => {
    let text = req.body.text;
    // implement your bot here ... 
    res.send('derp!');
});