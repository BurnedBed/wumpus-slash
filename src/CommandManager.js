const Discord = require('discord.js');
const Command = require('./structures/Command');
const GuildCommandManager = require('./structures/GuildCommandManager');
const Interaction = require('./structures/Interaction');
const { EventEmitter } = require('events');
const CommandOption = require('./structures/CommandOption');

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
         if (data.type === 1) return;
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
    * @param {object} command Command to create
    * @param {string} command.name The name of the command
    * @param {string} command.description The description of the command
    * @param {CommandOption[]} command.options Command's options
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
    * @param {string} command.name The name of the command
    * @param {string} command.description The description of the command
    * @param {CommandOption[]} command.options Command's options
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
    * @param {object[]} commands
    * @param {string} commands.name The name of the command
    * @param {string} commands.description The description of the command
    * @param {CommandOption[]} commands.options Command's options
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