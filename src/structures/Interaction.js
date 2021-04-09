const {
   User,
   GuildMember,
   Client,
   Guild,
   GuildChannel,
} = require('discord.js');
const InteractionData = require('./InteractionData');

/**
 * Represents an interaction
 * @class
 */
class Interaction {
   /**
    *
    * @param {object} data
    * @param {Client} client
    */
   constructor(data, client) {
      /**
       * ID of this interaction
       * @type {string}
       */
      this.id = data.id;

      /**
       * Token of this interaction
       * @type {string}
       */
      this.token = data.token;

      /**
       * Application's ID
       * @type {string}
       */
      this.applicationID = data.application_id;

      /**
       * Type of this interaction
       * 1 - Ping (ignore)
       * 2 - ApplicationCommand
       * @type {number}
       */
      this.type = data.type;

      /**
       * @type {InteractionData}
       */
      this.data = new InteractionData(data.data);

      /**
       * @private
       */
      this._guildID = data.guild_id;

      /**
       * Guild object if the command was executed in a guild
       * @type {Guild}
       */
      this.guild = client.guilds.cache.get(this._guildID);

      /**
       * @private
       */
      this._channelID = data.channel_id;

      /**
       * Channel where the command was executed
       * @type {GuildChannel}
       */
      this.channel = client.channels.cache.get(this._channelID);

      /**
       * Whether this interaction was made in Direct Messaes
       * @type {boolean}
       */
      this.dm = false;

      if (data.user) {
         /**
          * User that invoked the command, only present if the interactionb was created in Direct Messages
          * @type {User}
          */
         this.user = new User(client, data.user);
         this.dm = true;
      } else {
         /**
          * Member which invoked the command
          * @type {GuildMember}
          */
         this.member =
            this.guild && this.guild.members.cache.has(data.member.user.id)
               ? this.guild.members.cache.get(data.member.user.id)
               : new GuildMember(client, data.member, this.guild);
      }

      /**
       * Read only property, always 1
       * @private
       */
      this._version = data.version;
   }
}

module.exports = Interaction;
