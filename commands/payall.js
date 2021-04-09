const mongoose = require("mongoose");
const botconfig = require("../json-files/botconfig.json");

mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require("../models/data.js");

module.exports.run = async (bot, message, args) => {  

    if(message.author.id != "775014463278546944") return;

    Data.find({
        lb: "all"
    }).sort([
        ['money', 'descending']
    ]).exec((err, res) => {
        if(err) console.log(err);

        if(!args[0]) return message.reply("Please specify an amount!");
        if(args[0] != Math.floor(args[0])) return message.reply("Please enter only whole numbers!");
    
        if(!res) return message.reply("N users found!");

        for(i = 0; i < res.length; i++) {
            Data.findOne({
                userID: res[i].userID
            }, (err, data) => {
                if(err) console.log(err);
                if(data) {
                    data.money += parseInt(args[0]);
                    data.save().catch(err => console.log(err));
                }
            })
        }

        return message.channel.send(`${message.author.username} admin paid $${args[0]} to everyone!`);

    })
        
    let botEvents = bot.channels.cache.get("822938534881132554");
    botEvents.send(`payall.js command executed succesfully in ${message.guild.name} by ${message.author.toString()}!`);

}

module.exports.help = {
    name: "payall",
    aliases: []
}