const {
   User,
   GuildMember,
   Client,
   Guild,
   GuildChannel,
   MessageEmbed,
} = require('discord.js');
const InteractionData = require('./InteractionData');
const AllowedMentions = require('./AllowedMentions');
const { responseTypes } = require('../constants');

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

   /**
    *
    * @param {object} data Response Object
    * @param {('Pong'|'ChannelMessageWithSource'|'DeferredChannelMessageWithSource')} data.type Response type
    * @param {object} data.data Data of this response
    * @param {boolean} data.data.tts Whether to send this message as text-to-speech
    * @param {string} data.data.content Message content
    * @param {MessageEmbed[]} data.data.embeds Array of embeds, max: 10
    * @param {AllowedMentions} data.data.allowedMentions Allowed mentions object
    * @param {number} data.data.flags Response flags, use 64 to make the response ephemeral
    */
   reply(data) {
      const interactionResp = {
         type: responseTypes[data.type || 'ChannelMessageWithSource'],
         data: {
            tts: data.data.tts || false,
            content: data.data.content || '',
            embeds: data.data.embeds || [],
            allowed_mentions: new AllowedMentions(
               data.data.allowedMentions || {}
            ),
            flags: data.data.flags || 0,
         },
      };

      return this.guild.client.api
         .interactions(this.id)
         [this.token].callback.post({ data: interactionResp });
   }
}

module.exports = Interaction;
