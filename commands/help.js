const pagination = require('discord.js-pagination');
const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    //Sort your commands into categories, and make seperate embeds for each category
    message.reply("If something is wrapped in <> or [], do not include the brackets when using the command. They indicate whether that part of the command is required <> or optional [].")
    const moderation = new Discord.MessageEmbed()
    .setTitle('Moderation')
    .setURL("https://discord.gg/PXjNZ7AZPz")
    .addField('`kick <@user>`', 'Kicks a specified member from your server via mention.')
    .addField('`ban <@user>`', 'Bans a specified member from your server via mention.')
    .addField('`clear <number of messages you want to clear>`', 'Purges messages.')
    .addField('`deletewarn <@user>`', 'Removes a warn from a specified member via mention.')
    .addField('`warn <@user>`', 'Warns a specified member via mention.')
    .addField('`prefix <new prefix>`', 'Changes the bots prefix for that server.')
    .setTimestamp()
    .setFooter("If something is wrapped in <> or [], do not include the brackets when using the command. They indicate whether that part of the command is required <> or optional [].");

    const fun = new Discord.MessageEmbed()
    .setTitle('Fun')
    .setURL("https://discord.gg/PXjNZ7AZPz")
    .addField('`8ball <question>`', 'Ask 8 ball a question and it will answer with only the truth.')
    .addField('`ascii <text>`', 'Converts text into ascii')
    .addField('`balance [@user]`', 'Checks a users balance')
    .addField('`pay <@user>`', 'Pays a specified member a specified amount of coins.')
    .addField('`daily`', 'Gives the user there daily reward.')
    .addField('`gamble <amount of money or all>`', 'Gamble a specified amount of money')
    .addField('`hug [@user]`', 'Hugs a specified user.')
    .addField('`image <image name>`', 'Sends a specified image')
    .addField('`leaderboard`', 'Send the current leaderboard')
    .addField('`store`', 'Displays the shop.')
    .addField('`work`', 'Lets the user earn money by working.')
    .setTimestamp()
    
    const utility = new Discord.MessageEmbed()
    .setTitle('Utlity')
    .setURL("https://discord.gg/PXjNZ7AZPz")
    .addField('`calculate <math problem>`', '+ for addition, - for subtraction, * for multiplikation and / for division')
    .addField('`ping`', 'Get the bot\'s API ping')
    .addField('`weather <country/region>`', 'Checks weather forecast for provided location')
    .addField('`remind <time in s, m, h, d> <what to be reminded of>`', 'Reminds the user of something they specified.')
    .addField('`suggestion <your suggestion>`', 'Sends a suggestion.')
    .addField('`userinfo [@user]`', 'Sends a canvas with some of the users info.')
    .addField('`warnings [@user]`', 'Displays a specified users total warns.')
    .setTimestamp()
    

    const issues = new Discord.MessageEmbed()
    .setTitle('Problem Solving')
    .setURL("https://discord.gg/PXjNZ7AZPz")
    .addField('`bugreport <a short but comprehensive description>`', 'Sends a bugreport.')
    .addField('`support <a short but comprehensive description>`', 'Sends a help request, please do not abuse this command and do **not** spam it or your server will be blacklisted from the bot.')
    .setTimestamp()
    

    const developer = new Discord.MessageEmbed()
    .setTitle('Developer')
    .setURL("https://discord.gg/PXjNZ7AZPz")
    .addField('`adminpay <amount> <@user>`', 'Pays any given amount to a mentioned user.')
    .addField('`payall <amount>`', 'Pays every user with an account.')
    .addField('`say <#channel name> <message>`', 'Makes the bot send a message in a specified channel.')
    .setTimestamp()
    

    const pages = [
            moderation,
            fun,
            utility,
            issues,
            developer
    ]

    const emojiList = ["⏪", "⏩"];

    const timeout = '120000';

    pagination(message, pages, emojiList, timeout)
        
    let botEvents = bot.channels.cache.get("822938534881132554");
    botEvents.send(`help.js command executed succesfully in ${message.guild.name} by ${message.author.toString()}!`);
    
}
module.exports.help = {
    name: "help",
    aliases: []
}