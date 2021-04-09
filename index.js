const CommandManager = require('./src/CommandManager');
const GuildCommandManager = require('./src/structures/GuildCommandManager');
const Command = require('./src/structures/Command');
const CommandChoice = require('./src/structures/CommandChoice');
const CommandOption = require('./src/structures/CommandOption');

function SlashCommands(client) {
   return new CommandManager(client);
}

SlashCommands.CommandManager = CommandManager;
SlashCommands.GuildCommandManager = GuildCommandManager;
SlashCommands.Command = Command;
SlashCommands.CommandChoice = CommandChoice;
SlashCommands.CommandOption = CommandOption;

module.exports = SlashCommands;