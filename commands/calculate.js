const math = require('mathjs');

const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

        if(!args[0]) return message.channel.send('Please provide a question');

        let resp;

        try {
            resp = math.evaluate(args.join(" "))
        } catch (e) {
            return message.channel.send('Please provide a **valid** question')
        }

        const embed = new Discord.MessageEmbed()
        .setColor(0x808080)
        .setTitle('Calculator')
        .addField('Question', `\`\`\`css\n${args.join(' ')}\`\`\``)
        .addField('Answer', `\`\`\`css\n${resp}\`\`\``)

        message.channel.send(embed);
    
        let botEvents = bot.channels.cache.get("822938534881132554");
        botEvents.send(`calculate.js command executed succesfully in ${message.guild.name} by ${message.author.toString()}!`);
    }

module.exports.help = {
    name: "calculate",
    aliases: []
}