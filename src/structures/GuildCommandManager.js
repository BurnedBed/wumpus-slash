const { Client } = require('discord.js');
const Command = require('./Command');

/**
 * Represents command manager for a guild
 * @class
 */
class GuildCommandManager {
   /**
    *
    * @param {Client} client Client object
    * @param {string} guildID Guild's ID
    */
   constructor(client, guildID) {
      this._client = client;
      this.guildID = guildID;
   }
   /**
    *
    * @returns {Promise<Command[]>}
    */
   getCommands() {
      return this._client.api
         .applications(this._client.user.id)
         .guilds(this.guildID)
         .commands.get()
         .then((data) => data.map((x) => new Command(x)));
   }

   /**
    *
    * @param {string} id Command's ID
    * @returns {Promise<Command>}
    */
   getCommand(id) {
      return this._client.api
         .applications(this._client.user.id)
         .guilds(this.guildID)
         .commands.get(id)
         .then((data) => new Command(data));
   }

   /**
    *
    * @param {Command} command Command to create
    * @returns {Promise<Command>}
    */
   create(command) {
      return this._client.api
         .applications(this._client.user.id)
         .guilds(this.guildID)
         .commands.post({ data: command })
         .then((data) => new Command(data));
   }

   /**
    *
    * @param {string} id ID of the command
    * @param {Command|object} command
    * @returns {Promise<Command>}
    */
   edit(id, command) {
      return this._client.api
         .applications(this._client.user.id)
         .commands(id)
         .patch({ data: command })
         .then((data) => new Command(data));
   }

   /**
    *
    * @param {string} id
    * @returns {Promise}
    */
   delete(id) {
      return this._client.api
         .applications(this._client.user.id)
         .guilds(this.guildID)
         .commands(id)
         .delete();
   }

   /**
    *
    * @param {Command[]} commands
    * @returns {Promise<Command[]>}
    */
   bulkOverwrite(commands) {
      return this.client.api
         .applications(this._client.user.id)
         .guilds(this.guildID)
         .commands.put({ data: commands })
         .then((data) => data.map((x) => new Command(x)));
   }
}

module.exports = GuildCommandManager;
