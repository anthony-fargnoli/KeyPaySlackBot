const moment = require('moment');

class DateHandlerService {
    
    constructor(){
        
    }
    
    parseDate(dateString)  {
        
         let date = moment(dateString);
         
         if (!date.isValid())
             return Error(`${dateString} is not a valid Date`)
        
         return `this date in your timezone is ${date.format()}.`
        
    }
    
    
    
    
}

module.exports = DateHandlerService;