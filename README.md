Install with: `npm i wumpus-slash`

A framework to use slash-commands easily in discord.js.
The framework is mostly documented, if you are confused with what data to fill in see [this](https://discord.com/developers/docs/interactions/slash-commands#data-models-and-types)

# Setup
```js
const CommandManager = require('slashcommands');
const { Client, Intents } = require('discord.js');
const client = new Client({ ws: { intents: Intents.ALL } });
const slashManager = CommandManager(client);

client.on('ready', () => console.log("I'm ready!"));
client.login('VERY_SECRET_TOKEN');
```

### Create a command
```js
slashManager.create({
    name: "ping"
    description: "Ping pong command"
});
```

### Edit a command
```js
slashManager.edit('805404611866394644', {
   name: 'ping',
   description: 'An edited ping pong command!',
});
```

### Delete a command
```js
slashManager.delete('805404611866394644');
```

### Overwrite commands
```js
slashManager.bulkOverwrite([
   {
      name: 'ping',
      description: 'Overwritten ping pong command',
   },
]);
```

### Get a command(s)
```js
// get one command by id
slashManager.getCommand('805404611866394644');

// get all application commands
slashManager.getCommands();
```

# Interactions
When a user invoked a slash command an `Interaction` event will trigger.
If you need interaction's properties: [here](https://github.com/Linker-123/slashcommands/blob/main/src/structures/Interaction.js)
Here's an example:
```js
slashManager.on('interaction', (interaction) => {
   if (interaction.data.name === 'ping') {
      interaction.reply({
         type: 'ChannelMessageWithSource',
         data: { content: 'Pong!' },
      });
   }
});
```

# Guild Commands
In order to modify a specific guild's commands use: `slashManager.guilds('GUILD_ID')`.
This will return a Command Manager for that guild, all of the methods above are the same.
