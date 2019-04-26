class User {
    //
    // Id;
    // Name;
    // TimeZone;
    // Locale;
    // Offset;
    //
    constructor(slackUser){
        this.Id = slackUser.id;
        this.Name = slackUser.name;
        this.TimeZone = slackUser.tz_label;
        this.Locale = slackUser.tz;
        this.Offset = slackUser.ts_offset;
    }
    
}

module.exports = User;