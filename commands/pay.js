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

    let user = message.mentions.members.first() || bot.user.cache.get(args[0]);
    if(!user) return message.reply("Sorry, couldn't find user.");

    if(user.id === message.author.id) return message.reply("You cannot pay yourself!");

    Data.findOne({
        userID: message.author.id
    }, (err, authorData) => {
        if(err) console.log(err);
        if (!authorData) {
            return message.reply("you dont have any money to send.")
        } else {
            Data.findOne({
                userID: user.id
            }, (err, userData) => {
                if(err) console.log(err);

                if(!args[1]) return message.reply("Please specify the amount you want to pay.");

                if(parseInt(args[1]) > authorData.money) return message.reply("You do not have that much money.");
                if(parseInt(args[1]) < 1) return message.reply("You cannot pay less then $1.");

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
                    authorData.money -= parseInt(args[1]);
                    newData.save().catch(err => console.log(err));
                    authorData.save().catch(err => console.log(err))
                } else {
                    userData.money += parseInt(args[1]);
                    authorData.money -= parseInt(args[1]);
                    userData.save().catch(err => console.log(err));
                    authorData.save().catch(err => console.log(err));
                }

                return message.channel.send(`${message.author.username} payed $${args[1]} to ${bot.users.cache.get(user.id).username}`);
            })
        }
    })
        
    let botEvents = bot.channels.cache.get("822938534881132554");
    botEvents.send(`pay.js command executed succesfully in ${message.guild.name} by ${message.author.toString()}!`);

}

module.exports.help = {
    name: "pay",
    aliases: []
}