const ms = require("ms");

module.exports.run = async (client, message, args) => {

    //!temptag @user tag-label 1s/m/h/d
    if (message.member.hasPermission("MANAGE_ROLES")) {
        let userToTag = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!userToTag) return message.reply("Couldn't find user.");
        if (userToTag.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't tag them!");
        let tagRole = message.guild.roles.find(tagRole => tagRole.name === args[1]);

        //start of create role
        if (!tagRole) {
            try {
                tagRole = await message.guild.createRole({
                    name: args[1],
                    color: "#FFFFFF",
                    permissions: []
                });
            } catch (e) {
                console.log(e.stack);
            }
        }
        //end of create role

        let tagTime = args[2];
        if (!tagTime) return message.reply("You didn't specify a time!");

        await (userToTag.addRole(tagRole.id));
        let replychannel = client.channels.get('641372620008325130');
        replychannel.send(`<@${userToTag.id}> tagged for ${ms(ms(tagTime))}`);

        setTimeout(function () {
            await userToTag.roles.has(message.guild.roles.find(tagRole => tagRole.name === args[1]));
            message.channel.send(`<@${userToTag.id}> has been untagged!`);
            if (teamRole.members.length === 0) {
                message.channel.sendMessage('Test'); //It says test for now for testing reason, I read the documentation and I don't know how to delete a role could you help me after with that  
            }
        }, ms(tagTime));
    }
}

module.exports.help = {
    name: "temptag"
}