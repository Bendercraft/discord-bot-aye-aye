'use strict';
require('dotenv').config();

const CommandHandler    = require('./app/command_handler');
const Log4JS            = require('log4js');
const Discord           = require('discord.js');

Log4JS.configure('./log_config.json');

var outLog = Log4JS.getLogger('out');
var allLog = Log4JS.getLogger('default');

var client = new Discord.Client();
var commandHandler = new CommandHandler();

process.on('SIGINT', async () =>
{
    allLog.info('SIGINT received');

    client.destroy();
    allLog.info('Discord client destroyed');
    outLog.info('Discord bot exited');
    process.exit();
});

client.on('ready', () =>
{
    client.user.setActivity('Avatar Horizon');
    allLog.info(`Logged in as ${client.user.tag}!`);
    outLog.info('Discord bot started');
});

client.on('message', message =>
{
    if (message.channel.name === 'bot')
    {
        commandHandler.handleCommand(message);
    }
});

client.login(process.env.DISCORD_CLIENT_TOKEN);