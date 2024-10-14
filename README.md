# AskAladdin: Discord Search Bot

**AskAladdin** is a Discord bot that provides fast, intelligent, and relevant search results using the `/search <prompt>` command. It integrates with the **Grauq API** to process queries and deliver accurate information directly within Discord.

## Features

- **Fast and Accurate Search Results**: Aladdin sends queries to the Grauq API, utilizing the powerful **Mixtral model** to return context-aware responses.
- **Simple Command**: Users can quickly search using the `/search <prompt>` command, gaining access to relevant information in a user-friendly way.
- **Seamless Discord Integration**: Responses are delivered directly in Discord, ensuring a smooth and efficient search experience.

## Technology Stack

- **Backend**: AskAladdin's server is built with **Express** and **Node.js**, offering a scalable solution capable of efficiently handling multiple requests.
- **API Integration**: Aladdin integrates with the **Grauq API** for query processing and retrieval of accurate information.

## Installation

Follow these steps to install and run AskAladdin:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/aladdin-discord-bot.git
2. **Navigate to the project directory:**
    ```bash
    cd aladdin-discord-bot
3. **Install dependencies:**
    ```bash 
    npm install
4. **Create a .env file in the root directory and add the following environment variables:**
    ```bash
    DISCORD_TOKEN=your-discord-token
    CLIENT_ID=your-client-id
    GROQ_API_KEY=your-grauq-api-key
5. **Start the bot:**
    ```bash 
    npm start

