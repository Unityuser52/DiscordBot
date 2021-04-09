const mongoose = require("mongoose");
const botconfig = require("../json-files/botconfig.json");

// CONNECT TO DATABASE
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// MODELS
const Data = require("../models/data.js");

module.exports.run = async (bot, message, args) => {
    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;

    Data.findOne({
        userID: user.id
    }, (err, data) => {
        if(err) console.log(err);
        if(!data) {
            const newData = new Data({
                name: bot.users.cache.get(user.id).username,
                userID: user.id,
                lb: "all",
                money: 0,
                daily: 0,
                worked: 0,
                warnings: 0,
                IsAfk: false,
            })
            newData.save().catch(err => console.log(err));
            return message.channel.send(`${bot.users.cache.get(user.id).username} has no warnings :D.`);
        } else {
            return message.channel.send(`${bot.users.cache.get(user.id).username} has ${data.warnings} warnings.`);
        }      
    })
            
    let botEvents = bot.channels.cache.get("822938534881132554");
    botEvents.send(`warnings.js command executed succesfully in ${message.guild.name} by ${message.author.toString()}!`);
}
module.exports.help = {
    name: "warnings",
    aliases: []
}