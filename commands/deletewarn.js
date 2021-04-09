const Discord = require('discord.js');

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
    if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send('You can\'t use that');

    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

    if(!user) return message.channel.send('Please specify a user, via mention or ID');

    if(user.bot) return message.channel.send('You can\'t warn bots');

    if(message.author.id === user.id) return message.channel.send('You can\'t warn yourself nitwit');

    if(message.guild.owner.id === user.id) return message.channel.send('You can\'t warn the server\'s owner');

    let reason = args.slice(1).join(" ");

    if(!reason) reason = 'Unspecified';

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
                warnings: 0,
            })
            newData.save().catch(err => console.log(err));
            return message.channel.send(`${user} has 0 warning.`);
        } else {
                data.warnings -= 1;
                data.save().catch(err => console.log(err));

                return message.channel.send(`${message.author.username} revoked a warn from ${bot.users.cache.get(user.id).username}`);
            } 
    })
    
    let botEvents = bot.channels.cache.get("822938534881132554");
    botEvents.send(`deletewarn.js command executed succesfully in ${message.guild.name} by ${message.author.toString()}!`);
}
module.exports.help = {
    name: "deletewarn",
    aliases: []
}