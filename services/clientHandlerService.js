const moment = require('moment');
const User = require('../models/user');
const DateHandlerService = require('../services/dateHandlerService');

class ClientHandlerService {
    //
    // Users,
    // dateHandlerService
    //
    constructor(slackUsers){
        this.Users = [];
        this.dateHandlerService = new DateHandlerService();
        for (const slackUser of slackUsers) {
            this.AddUser(slackUser)    
        }        
    }

    AddUser(slackUser)  {
        this.Users.push(new User(slackUser));
    }

    ParseDate(date, userId){
        const user = this.Users.find((u) => u.Id === userId);
        
        if (!user)
            return null;
        
        return this.dateHandlerService.parseDate(date, user.Locale);
    }
    
}

module.exports = ClientHandlerService;