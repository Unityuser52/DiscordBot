const Discord = require('discord.js');
const colors = require("../json-files/colors.json");

module.exports.run = async (bot, message, args) => {
    if (!args[0]) return message.channel.send('Please ask a full question!'); // return if no question is commenced
    const replies = ['It is certain.', ' It is decidedly so.', 'Without a doubt.', 'Yes – definitely.',
     'You may rely on it.', 'As I see it, yes.', 'Most likely.', 'Outlook good.', 'Yes.', 'Signs point to yes.',
      'Reply hazy, try again.', 'Ask again later.', 'Better not tell you now.', 'Cannot predict now.', ' Concentrate and ask again.',
       "Don't count on it.", ' My reply is no.', 'My sources say no.', 'Outlook not so good.', 'Very doubtful.'
  ]; // random responses
  
    if (args[0].length > 1000) return message.channel.send('You cannot ask a question with more then 1000 characters!');

    const result = Math.floor(Math.random() * replies.length); // Get a random respons for the array
    const question = args.join(' '); // join the args(Array<string>) to a question string
    // check permissions for embed
    if (message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
      const embed = new Discord.MessageEmbed() // create embed 
        .setAuthor('🎱 The 8 Ball says...')
        .setColor(colors.orange).addField('Question:', question)
        .addField('Answer:', replies[result]);
      await message.channel.send(embed); // send embed message
    } else {
      await message.channel.send(`**Question:**\n${question}\n**Answer:**\n${replies[result]}`); // no permissins so bot will default to a raw message
    }
    let botEvents = bot.channels.cache.get("822938534881132554");
    botEvents.send(`8ball.js command executed succesfully in ${message.guild.name} by ${message.author.toString()} with args ${question}!`);
}

module.exports.help = {
    name: "8ball",
    aliases: ["8b"]
}