module.exports.run = async (bot, message, args) => {

    const m = await message.channel.send("ping?");
    m.edit(`Pong! ${m.createdTimestamp - message.createdTimestamp}ms`);
        
    let botEvents = bot.channels.cache.get("822938534881132554");
    botEvents.send(`ping.js command executed succesfully in ${message.guild.name} by ${message.author.toString()}!`);
}

module.exports.help = {
    name: "ping",
    aliases: ["test"]
}