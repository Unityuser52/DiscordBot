const Discord = require('discord.js');

const mongoose = require("mongoose");
const botconfig = require("../json-files/botconfig.json");
const data = require('../models/data.js');


// CONNECT TO DATABASE
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// MODELS
const Data = require("../models/data.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send('You can\'t use that');

    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

    if(!user) return message.channel.send('Please specify a user, via mention or ID');

    if(user.bot) return message.channel.send('You can\'t warn bots');

    if(message.author.id === user.id) return message.channel.send('You can\'t warn yourself nitwit');

    if(message.guild.owner.id === user.id) return message.channel.send('You can\'t warn the server\'s owner');

    let reason = args.slice(1).join(" ");

    if(!reason) reason = 'Unspecified';
    if(data.warnings === 3) return message.channel.send("This user already has 3 warns!")

    Data.findOne({
        userID: user.id
    }, (err, data) => {
        if(err) console.log(err);
        if(!data) {
            const newData = new Data({
                name: message.author.username,
                userID: message.author.id,
                lb: "all",
                money: 0,
                daily: 0,
                worked: 0,
                warnings: 1,
                IsAfk: false,
            })
            newData.save().catch(err => console.log(err));
            user.send(`You were warned in ${message.guild.name} for the follwoing reason: \`${reason}\``)
            return message.channel.send(`**${user.username}** has been warned`)
        } else {
                data.warnings += 1;
                data.save().catch(err => console.log(err));
                user.send(`You were warned in ${message.guild.name} for the follwoing reason: \`${reason}\``)
                return message.channel.send(`**${user.username}** has been warned`)
            } 
    })
    let botEvents = bot.channels.cache.get("822938534881132554");
    botEvents.send(`warn.js command executed succesfully in ${message.guild.name} by ${message.author.toString()}!`);
}
module.exports.help = {
    name: "warn",
    aliases: []
}