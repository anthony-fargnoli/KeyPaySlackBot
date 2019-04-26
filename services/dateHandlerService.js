const moment = require('moment');
const timezone = require('moment-timezone');

class DateHandlerService {
    
    constructor(){
        
    }
    
    parseDate(dateString, timeZone)  {
        
         const date = moment(dateString);
         
         if (!date.isValid())
             return Error(`${dateString} is not a valid Date`);

        const newTimeZoneDate = date.tz(timeZone);
         
         return `this date in your timezone is ${newTimeZoneDate.format()}.`;
        
    }
    
    
    
    
}

module.exports = DateHandlerService;