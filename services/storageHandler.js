const moment = require('moment');
const models = require('../models/*');

class StorageHandler {

    Users;
    
    constructor(slackUsers){
        this.Users = [];

        for (const slackUser of slackUsers) {
            AddUser(slackUser)    
        }
        
    }

    AddUser(slackUser)  {

        this.Users.push(new User(slackUser));
        
    }




}

module.exports = DateHandlerService;