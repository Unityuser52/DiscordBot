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

    if(!args[0]) {
        var user = message.author;
    } else {
        var user = message.mentions.users.first() ||  bot.users.cache.get(args[0]);
    }

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
            })
            newData.save().catch(err => console.log(err));
            return message.channel.send(`${bot.users.cache.get(user.id).username} has $0.`);
        } else {
            return message.channel.send(`${bot.users.cache.get(user.id).username} has $${data.money}.`);
        }
    })
    let botEvents = bot.channels.cache.get("822938534881132554");
    botEvents.send(`balance.js command executed succesfully in ${message.guild.name} by ${message.author.toString()}!`);

}

module.exports.help = {
    name: "balance",
    aliases: ["bal", "money"]
}