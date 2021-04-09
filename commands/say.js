module.exports.run = async (bot, message, args) => {  
    if(message.author.id != "775014463278546944") return message.reply("Sorry you need to be the developer of this bot to use this command ;-;");

    let textChannel = message.mentions.channels.first() // the first channel that you tag
    if(!args[0]) return message.channel.send('Provide a channel for me to send the message in!'); // args are words or numbers after the command. The first word is args[0], and then args[1], and so on and so on.
    if(!args[1]) return message.channel.send('Provide a message to say!');
    if (!message.guild.channels.cache.has(textChannel.id)) return message.channel("Channel not found"); // here we're checking if the textChannel id provided is in the server where the message is being sent.
    message.delete() // deleting the command message

        msg = args.slice(1).join(" "); // everything including and after args[1]
        textChannel.send(msg) // sending the message in the text channel provided
            
        let botEvents = bot.channels.cache.get("822938534881132554");
        botEvents.send(`say.js command executed succesfully in ${message.guild.name} by ${message.author.toString()}!`);

}


module.exports.help = {
    name: "say",
    aliases: ["s"]
}