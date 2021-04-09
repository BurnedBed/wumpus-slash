const InteractionDataOption = require('./InteractionDataOption');

/**
 * Represents interaction's data
 * @class
 */
class InteractionData {
   /**
    *
    * @param {InteractionData} data
    */
   constructor(data) {
      /**
       * The ID of the invoked command
       * @type {string}
       */
      this.id = data.id;

      /**
       * Name of the invoked command
       * @type {string}
       */
      this.name = data.name;

      /**
       *
       * @type {InteractionDataOption[]}
       */
      this.options = data.options;
   }
}

module.exports = InteractionData;
