const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
client.config = config;


//////////////////////
//	COMMAND BUILDER //
//////////////////////
client.commands = new Discord.Collection();	// Make the new Collection to hold the commands
fs.readdir("./cmd/", (err, files) => {
	if(err) console.error(err);

	var jsfiles = files.filter(f => f.split(".")[0]);	// Split file names at "." and keep array portion [0], everything before the period
	if(jsfiles.length <= 0){
		console.log("No commands to load");
		return;
	}

	console.log(`Loading ${jsfiles.length} commands!`);

	jsfiles.forEach((f, i) => {		// f is the element of jsfiles[] i is our internal counter
		let props = require(`./cmd/${f}`);
		console.log(`${i + 1}: ${f} loaded!`)
		client.commands.set(props.help.name, props);
	});
});

client.on("ready", () => {
  client.user.setActivity(`Banning simulator`, {type: "PLAYING"});
	console.log(`${client.user.username} is ready!`);
});


//////////////////////
//	MESSAGE HANDLER	//
//////////////////////
client.on('message', async message => {

	//if(message.author.id = "234433851772895234") message.delete();
	if(!message.content.startsWith(config.prefix)) return;	// Ignore non-commands
	// Using args to define commands
	// Make the args array, first remove the prefix and split at spaces
	var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	// Remove the first element as var command and make lower case
	var command = args.shift().toLowerCase()

	// Check for the command and execute if it exists
	let cmd = client.commands.get(command);
	if(cmd) cmd.run(client, message, args);

});


client.login(config.token);
