const mongoose = require("mongoose");
const botconfig = require("../json-files/botconfig.json");
const data = require("../models/data.js");

// CONNECT TO DATABASE
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// MODELS
const Data = require("../models/data.js");

module.exports.run = async (bot, message, args) => {

    if(message.author.id != (botconfig.DevGeno || botconfig.DevAsriel)) return message.reply("I dont think so bruh.");

    let user = message.mentions.members.first() || bot.user.cache.get(args[0]);
    if(!user) return message.reply("Sorry, couldn't find user.");

    Data.findOne({
        userID: user.id
    }, (err, userData) => {
        if(err) console.log(err);

        if(!args[1]) return message.reply("Please specify the amount you want to pay.");

        if(args[1] != Math.floor(args[1])) return message.reply("Please enter only whole numbers!");

        if(!userData) {
            const newData = new Data({
                name: bot.users.cache.get(user.id).username,
                userID: user.id,
                lb: "all",
                money: parseInt(args[1]),
                daily: 0,
                worked: 0,
                warnings: 0,
            })
            newData.save().catch(err => console.log(err));
        } else {
            userData.money += parseInt(args[1]);
            userData.save().catch(err => console.log(err));
        }

        return message.channel.send(`${message.author.username} admin payed $${args[1]} to ${bot.users.cache.get(user.id).username}`);
    })
    let botEvents = bot.channels.cache.get("822938534881132554");
    botEvents.send(`adminpay.js command executed succesfully in ${message.guild.name} by ${message.author.toString()} with args ${user} and ${args[1]}!`);
}

module.exports.help = {
    name: "adminpay",
    aliases: ["ap"]
}