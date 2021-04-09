const figlet = require('figlet');

module.exports.run = async (bot, message, args) => {
    if(!args[0]) return message.channel.send('Please provide some text');

    msg = args.join(" ");

    figlet.text(msg, function (err, data){
        if(err){
            console.log('Something went wrong');
            console.dir(err);
        }
        if(data.length > 2000) return message.channel.send('Please provide text shorter than 2000 characters')

        message.channel.send('```' + data + '```')
    })
    let botEvents = bot.channels.cache.get("822938534881132554");
    botEvents.send(`ascii.js command executed succesfully in ${message.guild.name} by ${message.author.toString()} with args ${msg}!`);
}


module.exports.help = {
    name: "ascii",
    aliases: []
}