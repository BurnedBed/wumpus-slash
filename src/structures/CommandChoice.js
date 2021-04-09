/**
 * Represents a command's choice
 * @class
 */
class CommandChoice {
   /**
    *
    * @param {object} choice Choice object
    * @param {string} choice.name Name of the choice
    * @param {string} choice.value Value of the choice
    */
   constructor(choice) {
      /**
       * Name of the choice
       * @type {string}
       */
      this.name = choice.name;

      /**
       * Value of the choice
       * @type {strig}
       */
      this.value = choice.value;
   }
}

module.exports = CommandChoice;
