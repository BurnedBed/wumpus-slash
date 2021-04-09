class AllowedMentions {
   /**
    * 
    * @param {AllowedMentions} allowedMentions 
    */
   constructor(allowedMentions) {
      /**
       * Array of allowed mentions, users, roles, everyone
       * @type {Array}
       */
      this.parse = allowedMentions.parse || []

      /**
       * Array of role ID's allowed to be mentioned, max: 100
       * @type {string[]}
       */
      this.roles = allowedMentions.roles || [];

      /**
       * Array of user ID's to be mentioned, max: 100
       * @type {string[]}
       */
      this.users = allowedMentions.users || [];

      /**
       * Whether to mention the command invoker
       * @type {boolean}
       */
      this.replied_user = allowedMentions.replied_user || false
   }
}

module.exports = AllowedMentions;