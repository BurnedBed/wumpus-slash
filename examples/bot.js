const CommandManager = require('../index');
const { Client, Intents } = require('discord.js');
const client = new Client({ ws: { intents: Intents.ALL } });
const slashManager = CommandManager(client);

client.on('ready', () => {
   slashManager
      .getCommands()
      .then((commands) => {
         console.log(commands);
      })
      .catch((error) => console.log('Oops!' + error));
});

client.login('SOMETHING_VERY_SECRET');