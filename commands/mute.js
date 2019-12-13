const ms = require("ms");

module.exports.run = async (client, message, args) => {

    //!mute @user 1s/m/h/d
    if (message.member.hasPermission("MUTE_MEMBERS")) {
        let userToMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!userToMute) return message.reply("Couldn't find user.");
        if (userToMute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
        let muterole = message.guild.roles.find(muterole => muterole.name === "muted");

        //start of create role
        if (!muterole) {
            try {
                muterole = await message.guild.createRole({
                    name: "muted",
                    color: "#000000",
                    permissions: []
                });
            } catch (e) {
                console.log(e.stack);
            }
        }
        //end of create role

        let mutetime = args[1];
        if (!mutetime) return message.reply("You didn't specify a time!");

        await (userToMute.addRole(muterole.id) && userToMute.setMute(true));
        let replychannel = client.channels.get('641372620008325130');
        replychannel.send(`<@${userToMute.id}> muted for ${ms(ms(mutetime))}`);

        setTimeout(function () {
            userToMute.removeRole(message.guild.roles.find(muterole => muterole.name === "muted"));
            userToMute.setMute(false);
            replychannel.send(`<@${userToMute.id}> has been unmuted!`);
        }, ms(mutetime));
    }
}

module.exports.help = {
    name: "mute"
}