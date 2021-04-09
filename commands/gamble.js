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

    Data.findOne({
        userID: message.author.id
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
            return message.reply("Sorry you dont have any money to gamble! Use the daily command!");
        } else {
            var maxBet = 10000;

            if(data.money <= 0) return message.reply("You don't have money.");

            if(!args[0]) return message.reply("please specify a bet.");

            if(args[0].toLowerCase() == "all") args[0] = data.money;

            try {
                var bet = parseFloat(args[0]);
            } catch{
                return message.reply("you can only enter whole numbers.");
            }

            if (bet != Math.floor(bet)) return message.reply("you can only enter whole numbers.");

            if(data.money < bet) return message.reply("you don't have that much money.");

            if(bet > maxBet) return message.reply(`the maximum bet is ${maxBet.toLocaleString()}.`);

            let chances = ["win", "lose"];
            var pick = chances[Math.floor(Math.random() * chances.length)];

            if(pick == "lose") {
                data.money -= bet;
                data.save().catch(err => console.log(err));
                return message.reply(`you lose. New Balance: ${data.money}`);
            } else {
                data.money += bet;
                data.save().catch(err => console.log(err));
                return message.reply(`you win. New Balance: ${data.money}`);
            }
        }
    })

        
    let botEvents = bot.channels.cache.get("822938534881132554");
    botEvents.send(`gamble.js command executed succesfully in ${message.guild.name} by ${message.author.toString()}!`);

}

    module.exports.help = {
        name: "gamble",
        aliases: []
    }