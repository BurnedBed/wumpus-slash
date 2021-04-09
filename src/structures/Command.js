const CommandOption = require('./CommandOption');

/**
 * @class
 * Represents a slash command
 */
class Command {
   /**
    * @param {object} command Command object
    * @param {string} command.name The name of the command
    * @param {string} command.description The description of the command
    * @param {CommandOption[]} command.options Command's options
    */
   constructor(command) {
      /**
       * ID of the command
       * @type {string}
       */
      this.id = command.id;

      /**
       * Name of the command
       * @type {string}
       */
      this.name = command.name;

      /**
       * Description of the command
       * @type {string}
       */
      this.description = command.description;

      /**
       * Options of the command
       * @type {CommandOption[]}
       */
      this.options = command.options;
   }
}

module.exports = Command;
