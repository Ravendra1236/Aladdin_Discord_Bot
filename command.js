import { REST, Routes, ApplicationCommandOptionType } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'search',
    description: 'Searches for information using Gemini',
    options: [
      {
        name: 'query',
        description: 'The term you want to search',
        type: ApplicationCommandOptionType.String,
        required: true,
      }
    ],
  },
  {
    name: 'deleteall',
    description: 'Deletes all messages from the user in the current channel',
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
