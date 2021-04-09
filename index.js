// PACKAGES AND FILES
const Discord = require("discord.js");
const bot = new Discord.Client( { disableEveryone: true });
const botconfig = require("./json-files/botconfig.json");
const fs = require ("fs");
const guildId = ("822938533349425182")
const WOKCommands = require("wokcommands")

// const getApp= (guildId) => {
//     const app = bot.api.applications(bot.user.id)
//     if (guildId) {
//         app.guilds(guildId)
//     }
//     return app
// }

// await getApp(guildId).commands("")



const memberCounter = require('./NoPrefixNeeded/counters/member-counter');
const Badwords = require('./NoPrefixNeeded/badwords');
const botChat = require('./NoPrefixNeeded/botChat');

bot.commands = new Discord.Collection();
bot.aliases =new Discord.Collection();

// READ COMMANDS FOLDER
fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) {
        console.log("Couldnt find any commands!");
        return;
    }

    jsfile.forEach((f) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);

        props.help.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name);
        })
    })
})

// BOT ONLINE MESSAGE AND ACTIVITY MESSAGE
bot.on("ready", async () => {
    new WOKCommands(bot, {
        commandsDir: "slash",
        testServers: [guildId],
        showWarns: false,
    })
    console.log(`${bot.user.username} is online on ${bot.guilds.cache.size} servers!`)
    bot.user.setActivity(`with ${bot.guilds.cache.size} servers! | m! help`);
    memberCounter(bot);

})

bot.on("message", async message =>{

    // CHECK CHANNEL TYPE
    // if(message.channel.type === "dm") return;
    if(message.author.bot) return;

    // COMMANDS THAT DONT NEED A PREFIX
    Badwords(bot, message);
    botChat(bot, message);
    
    // SET PREFIX
    let prefixes = JSON.parse(fs.readFileSync("./json-files/server-specific/prefixes.json", "utf-8"));
    if(!prefixes[message.guild.id]) {
        prefixes [message.guild.id] = {
            prefix: botconfig.prefix
        }
    }
    let prefix = prefixes[message.guild.id].prefix;

    // CHECK PREFIX; DEFINE ARGS & COMMAND
    if(!message.content.startsWith(prefix)) return;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd;
    cmd = args.shift().toLowerCase();
    let command;
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot, message, args);

    // RUN COMMANDS
    if(bot.commands.has(cmd)) {
        command = bot.commands.get(cmd);
    } else if (bot.aliases.has(cmd)) {
        command = bot.commands.get(bot.aliases.get(cmd));
    }
    try {
        command.run(bot, message, args);
    } catch (e) {
        return;
    }
})

bot.login(botconfig.token);