const Discord = require('discord.js');
const Command = require('./structures/Command');
const GuildCommandManager = require('./structures/GuildCommandManager');
const Interaction = require('./structures/Interaction');
const { EventEmitter } = require('events');

/**
 * Slash command manager
 * @class
 * @extends {EventEmitter}
 */
class SlashCommands extends EventEmitter {
   /**
    *
    * @param {Discord.Client} client Client object
    */
   constructor(client) {
      super();
      this._client = client;
      this._client.ws.on('INTERACTION_CREATE', (data) => {
         const interaction = new Interaction(data, client);
         /**
          * @event interaction#SlashCommands
          * @type {Interaction}
          */
         this.emit('interaction', interaction);
      });
   }

   /**
    *
    * @returns {Promise<Command[]>}
    */
   getCommands() {
      return this._client.api
         .applications(this._client.user.id)
         .commands.get()
         .then((data) => data.map((command) => new Command(command)));
   }

   /**
    *
    * @param {string} id ID of the command to request
    * @returns {Promise<Command>}
    */
   getCommand(id) {
      return this._client.api
         .applications(this._client.user.id)
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
         .commands.put({ data: commands })
         .then((data) => data.map((x) => new Command(x)));
   }

   guilds(id) {
      return new GuildCommandManager(this._client, id);
   }
}

module.exports = SlashCommands;
