/**
 * Represent an option in the command interaction
 * @class
 */
class InteractionDataOption {
   /**
    *
    * @param {InteractionDataOption} option
    */
   constructor(option) {
      /**
       * Name of this option
       * @type {string}
       */
      this.name = option.name;

      /**
       * Value of this option
       * @type {string}
       */
      this.value = option.value;

      /**
       * Options for this option, present if this option is a group or subcommand
       * @type {InteractionDataOption[]}
       */
      this.options = option.options;
   }
}

module.exports = InteractionDataOption;
