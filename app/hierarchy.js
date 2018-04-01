const Discord = require('discord.js');
const GuildMember = Discord.GuildMember;

class Hierarchy
{
    constructor(data)
    {
        if (data != undefined && data != null)
        {
            this.leaderId  = data.leaderId;
            this.officerId = data.leaderId;
            this.memberId  = data.memberId;
        }
        else
        {
            this.leaderId = null;
            this.officerId = null;
            this.memberId = null;
        }
    }

    /**
     * 
     * @param {GuildMember} promoter 
     * @param {GuildMember} promoted 
     */
    canPromote(promoter, promoted)
    {

    }
}

module.exports = Hierarchy;