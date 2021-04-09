const Discord = require("discord.js");
const fs = require("fs");
const botconfig = require("../json-files/botconfig.json");
const colors = require("../json-files/colors.json");


module.exports.run = async (bot, message, args) => {
    let validGuildId = botconfig.VerifiedGuildId
    if(validGuildId.indexOf(message.guild.id) !== -1){
        let prefixes = JSON.parse(fs.readFileSync("./json-files/server-specific/prefixes.json", "utf-8"));
        if(!prefixes[message.guild.id]) {
            prefixes [message.guild.id] = {
                prefix: botconfig.prefix
            }
        }
        let prefix = prefixes[message.guild.id].prefix;
    
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("You cannot change the server prefix!");
    
        if(!args[0]) return message.reply("Please enter a prefix!");
    
        prefixes[message.guild.id] = {
            prefix: args[0]
        }
    
        fs.writeFile("./json-files/server-specific/prefixes.json", JSON.stringify(prefixes), (err) => {
            if(err) console.log(err);
        });
    
        let embed = new Discord.MessageEmbed()
        embed.setColor(colors.green);
        embed.setTitle("PREFIX SET");
        embed.setDescription(`Set to ${args[0]}`);
    
        message.channel.send(embed);
    
    } else{
    const yourEmbed = new Discord.MessageEmbed;
    yourEmbed.addField("To change the prefix of the bot you need to either have the premium version or be a partner of the bot!", "For more information on partnering click [this link!](https://discord.gg/PXjNZ7AZPz)");
    message.channel.send(yourEmbed);
    }
        
    let botEvents = bot.channels.cache.get("822938534881132554");
    botEvents.send(`prefix.js command executed succesfully in ${message.guild.name} by ${message.author.toString()}!`);
}

module.exports.help = {
    name: "prefix",
    aliases: []
}