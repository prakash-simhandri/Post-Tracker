const knex = require("../knex");
var unirest = require("unirest");
require('dotenv').config()
class Users {
    async SmS(num, message) {
        var Conversion = message.toString()
        var req = unirest("GET", "https://www.fast2sms.com/dev/bulk");

        req.query({
            "authorization": process.env.API_KEY,
            "sender_id": "FSTSMS",
            "message": Conversion,
            "language": "english",
            "route": "p",
            "numbers": num,
        });

        req.headers({
            "cache-control": "no-cache"
        });

        req.end(function (res) {
            if (res.error) throw new Error(res.error);

            console.log(res.body);
        });

    }
    async getByNumber(mobile_number) {
        return knex("posts").where("mobile_number", mobile_number)
    };
    async insertIntoDb(userPostData) {
        console.log(userPostData);
        return knex("posts").insert(userPostData)
    };
};

module.exports = Users;