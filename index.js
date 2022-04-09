// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
var cron = require("cron");

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    const { ping_timer, iplog_timer, ping, iplog, discord_server, ping_channel, iplog_channel } = require('./config.json');
	console.log('Ready!');

    // This will remind me every day to check my to do list
    let todoPing = new cron.CronJob(ping_timer.toString(), () => {
        // This runs every day at 15:45:00
        const guild = client.guilds.cache.get(discord_server.toString());
        const channel = guild.channels.cache.get(ping_channel.toString());
        if(ping == "True"){
            channel.send('Todo Reminder ||<@441666718507597834>||');
        }
    });
    todoPing.start()

    // This will log my public home IP address to allow me to ssh into my server
    let IPLog = new cron.CronJob(iplog_timer.toString(), () => {
        // This runs every day at 09:00:00
        const guild = client.guilds.cache.get(discord_server.toString());
        const channel = guild.channels.cache.get(iplog_channel.toString());

        // Getting my public IPV4 address
        var http = require('http');
        http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
            resp.on('data', function(ip) {
                if(iplog == "True"){
                    channel.send(ip + " :skull:");
                }
            });
        });
    });
    IPLog.start()
});

// Login to Discord with your client's token
client.login(token);