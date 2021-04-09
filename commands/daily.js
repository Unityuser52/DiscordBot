const ms = require("parse-ms")
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

    let timeout = 86400000;
    let reward = 1000;

    Data.findOne({
        userID: message.author.id
    }, (err, data) => {
        if(err) console.log(err);
        if(!data) {
            const newData = new Data({
                name: message.author.username,
                userID: message.author.id,
                lb: "all",
                money: reward,
                daily: Date.now(),
                worked: 0,
                warnings: 0,
            })
            newData.save().catch(err => console.log(err));
            return message.channel.send(`${message.author.username} has $${reward}.`);
        } else {
            if(timeout - (Date.now() - data.daily) > 0) {
                let time = ms(timeout - (Date.now() - data.daily));
                return message.reply(`**You already collected your daily reward!** Collect again in ${time.hours}h ${time.minutes}m ${time.seconds}s`);
            }else {
                data.money += reward;
                data.daily = Date.now();
                data.save().catch(err => console.log(err));

                return message.reply(`you received a reward of $${reward}.`);
            }
        } 
    })
    
    let botEvents = bot.channels.cache.get("822938534881132554");
    botEvents.send(`daily.js command executed succesfully in ${message.guild.name} by ${message.author.toString()}!`);
}

module.exports.help = {
    name: "daily",
    aliases: []
}