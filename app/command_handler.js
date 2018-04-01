'use strict';
const Discord       = require('discord.js');
const TextChannel   = Discord.TextChannel;
const Message       = Discord.Message;
const Log4JS        = require('log4js');
const fs            = require('fs');
const path          = require('path');

const Hierarchy = require('./hierarchy');

class CommandHandler
{
    constructor()
    {
        this.adminRoleId = null;
        this.hierarchies = [];
        this.allLog = Log4JS.getLogger('default');
        this.errorLog = Log4JS.getLogger('error');
    }

    /**
     * 
     * @param {Message} message 
     */
    handleCommand(message)
    {
        if (message.content.startsWith('!admins'))
        {
            this.defineAdminRole(message);            
        }
        else if (message.content.startsWith('!hierarchy'))
        {
            this.defineNewHierarchy(message);
        }
    }

    /**
     * 
     * @param {Message} message 
     */
    defineAdminRole(message)
    {
        if (message.guild.owner.id !== message.member.id)
        {
            message.member.send('Vous ne pouvez pas executer cette commande car vous n\'êtes pas le propriétaire de ce serveur');
            if (message.deletable) { message.delete(); }
        }
        else
        {
            if (message.mentions.roles.size < 1)
            {
                message.member.send('Vous devez mentionner le rôle Admins pour cette commande.');
                if (message.deletable) { message.delete(); }
            }
            else
            {
                let role = message.mentions.roles.first();
                this.adminRoleId = role.id;
                this.allLog.info(`Admin role defined to : ${role.name}(${role.id})`);
                this.saveData();
            }
        }
    }

    /**
     * 
     * @param {Message} message 
     */
    defineNewHierarchy(message)
    {
        if (message.guild.owner.id !== message.member.id && message.member.roles.find('id', this.adminRoleId) == null)
        {
            message.member.send('Vous ne pouvez pas executer cette commande.');
            if (message.deletable) { message.delete(); }
        }
        else
        {
            if (message.mentions.roles.size != 3)
            {
                message.member.send('Vous devez mentionner 3 roles pour la hiérarchie.');
                if (message.deletable) { message.delete(); }
            }
            else
            {

            }
        }
    }

    saveData()
    {
        let data = {};
        data.adminRoleId = this.adminRoleId;
        data.hierarchies = this.hierarchies;
        let str = JSON.stringify(data, null, 2);
        let filePath = path.join(process.cwd(), 'data', 'config.json');
        fs.writeFile(filePath, str, 
            (err) => 
            {
                if (err) { this.errorLog.error(err); }
            }
        );
    }
}

module.exports = CommandHandler;