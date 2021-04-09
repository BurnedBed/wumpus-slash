const CommandChoice = require('./CommandChoice');

/**
 * Represents a Command Option
 * @class
 */
class CommandOption {
   /**
    *
    * @param {CommandOption} option
    */
   constructor(option) {
      /**
       * Name of the option
       * @type {string}
       */
      this.name = option.name;

      /**
       * @type {string} Description of this option
       */
      this.description = option.description;

      /**
       * Whether this option is required
       * @type {boolean}
       */
      this.required = option.required;

      /**
       * Choices for this option
       * @type {CommandChoice[]}
       */
      this.choices = option.choices;

      /**
       * Options of this option
       * @type {CommandOption[]}
       */
      this.options = option.options;

      /**
       * Type of the option:
       * 1 - SUB_COMMAND
       * 2 - SUB_COMMAND_GROUP
       * 3 - STRING
       * 4 - INTEGER
       * 5 - BOOLEAN
       * 6 - USER
       * 7 - CHANNEL
       * 8 - ROLE
       * @type {number}
       */
      this.type = options.type;
   }
}

module.exports = CommandOption;
