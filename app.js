const http = require('http');
const slack = require('@slack/client');
const { createEventAdapter } = require('@slack/events-api');
const express = require('express');
const bodyParser = require('body-parser');
const DateHandlerService = require('./services/dateHandlerService');
const ClientHandlerService = require('./services/clientHandlerService');
const logger = require('heroku-logger');
module.exports = function() {};

const app = express();

const port = +process.env.PORT;
const token = process.env.SLACK_TOKEN;
const signingSecret = process.env.SLACK_SIGNING_SECRET;

const slackEvents = createEventAdapter(signingSecret, {
    includeBody: true
});

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// fetch user list and populate timezones for each user
const client = new slack.WebClient(token);

fetchUsers = (async() => {

    let arr = [];

    try
    {
        const response = await client.users.list();

        arr = response.members;
    }
    catch(e)
    {
        logger.error('Error occurred', {error: e});    
    }
    
    
    return arr;

});

let clientHandler = null;

(async() => {
    clientHandler = new ClientHandlerService(await fetchUsers());    
})();



// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
slackEvents.on('message', async (event) => {
    console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
    
    try
    {
        const response = await client.chat.postMessage({channel: event.channel, text: event.text});
        
        logger.info(response);
    }
    catch (e) {
        logger.error('error occurred while posting message', {error: e});
    }
    
});

// Handle errors (see `errorCodes` export)
slackEvents.on('error', logger.error);

app.use('/slack/events', slackEvents.expressMiddleware());

const server = app.listen(port, () => { logger.info('Express server   listening on port %d in %s mode', {port: server.address().port, env: app.settings.env})});


app.get('/', (req, res) => {
    let reqStr = req.query || {date: moment().format(), userid: 1};

    if (!reqStr.date) {
        res.send("I need a Date");
        return;
    }

    try {
        let date = clientHandler.ParseDate(reqStr.date, reqStr.userid);

        res.send(date);
    }
    catch (e) {
        res.send("An error occurred");
        logger.error('An error occurred', {error: e});
    }

});

