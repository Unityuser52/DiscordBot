const mongoose = require('mongoose');
const ms = require('parse-ms');
const botconfig = require("../json-files/botconfig.json");

mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require("../models/data.js");

module.exports.run = async (bot, message, args) => {
    let user = message.author;
    let timeout = 600000;
    let loan = 100;

    Data.findOne({
        userID: message.author.id
    }, (err, data) => {
        if(err) console.log(err);
        if(!data) {
            const newData = new Data({
                name: message.author.username,
                userID: message.author.id,
                lb: "all",
                money: loan,
                daily: 0,
                worked: timeout,
                warnings: 0,
                IsAfk: false,
            })
            newData.save().catch(err => console.log(err));
            return message.channel.send(`You worked hard and earned $${loan}.`);
        } else {
            if(timeout - (Date.now() - data.worked) > 0) {
                let time = ms(timeout - (Date.now() - data.worked));
                return message.reply(`**You are to tired to work again!** Take a rest and try again in ${time.minutes}m ${time.seconds}s`);
            }else {
                data.money += loan;
                data.worked = Date.now();
                data.save().catch(err => console.log(err));

                return message.reply(`You worked hard and earned $${loan}.`);
            }
        } 
    })
    let botEvents = bot.channels.cache.get("822938534881132554");
    botEvents.send(`work.js command executed succesfully in ${message.guild.name} by ${message.author.toString()}!`);
}

module.exports.help = {
    name: "work",
    aliases: []
}
