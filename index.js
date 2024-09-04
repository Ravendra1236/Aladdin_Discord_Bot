import { Client, GatewayIntentBits, InteractionType, PermissionFlagsBits } from 'discord.js';
import dotenv from 'dotenv';
import Groq from "groq-sdk";

// Load environment variables
dotenv.config();

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    try {
        if (interaction.commandName === 'ping') {
            await interaction.reply("Pong!!");
        } else if (interaction.commandName === 'search') {
            const query = interaction.options.getString('query');
            await interaction.deferReply();

            try {
                const chatCompletion = await groq.chat.completions.create({
                    messages: [
                        {
                            role: "user",
                            content: query,
                        }
                    ],
                    model: "mixtral-8x7b-32768", // model name
                });

                await interaction.editReply(chatCompletion.choices[0]?.message?.content || "No response generated.");
            } catch (error) {
                console.error('Groq API Error:', error);
                await interaction.editReply('An error occurred while processing your request.');
            }
        } else if (interaction.commandName === 'deleteall') {
            await interaction.deferReply({ ephemeral: true });
            
            if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
                return interaction.editReply("You don't have permission to use this command.");
            }

            const channel = interaction.channel;
            let messagesDeleted = 0;

            try {
                let messages;
                do {
                    messages = await channel.messages.fetch({ limit: 100 });
                    const userMessages = messages.filter(m => m.author.id === interaction.user.id);
                    
                    for (const message of userMessages.values()) {
                        await message.delete();
                        messagesDeleted++;
                    }
                } while (messages.size === 100);

                await interaction.editReply(`Successfully deleted ${messagesDeleted} of your messages.`);
            } catch (error) {
                console.error('Error deleting messages:', error);
                await interaction.editReply('An error occurred while deleting messages.');
            }
        }
    } catch (error) {
        console.error('Interaction Error:', error);
        if (interaction.deferred || interaction.replied) {
            await interaction.editReply('An error occurred while processing your request.');
        } else {
            await interaction.reply({ content: 'An error occurred while processing your request.', ephemeral: true });
        }
    }
});

client.on("messageCreate", (message) => {
    // Ignore messages from bots and messages that start with '/'
    if (message.author.bot || message.content.startsWith('/')) return;

    if (message.content.startsWith("create")) {
        const url = message.content.split("create")[1];
        return message.reply({
            content: "Generating short ID for " + url,
        });
    }

    // No other actions for regular messages
});

client.login(process.env.DISCORD_TOKEN);

// Error handling for the client
client.on('error', console.error);
client.on('warn', console.warn);
