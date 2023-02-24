const {
    Client,
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    Modal,
    TextInputComponent
} = require("discord.js");
const settings = require("./config");
const fs = require("fs");

/**
 *
 * @param {Client} client
 * @param {settings} settings
 */
module.exports = async (client, settings) => {
    // code

    client.on("interactionCreate", async (interaction) => {

        if (interaction.isCommand()) {
            switch (interaction.commandName) {
                case "setup":
                    {
                        let applyChannel = interaction.guild.channels.cache.get(
                            settings.applyChannel
                        );
                        if (!applyChannel) return;

                        let btnrow = new MessageActionRow().addComponents([
                            new MessageButton()
                                .setStyle("PRIMARY")
                                .setCustomId("ap_ping")
                                .setLabel("Ping me !!")
                                .setEmoji("📶"),
                            new MessageButton()
                                .setStyle("SUCCESS")
                                .setCustomId("ap_apply")
                                .setLabel("Apply For Whitelist")
                                .setEmoji("📑"),
                        ]);
                        applyChannel.send({
                            embeds: [
                                new MessageEmbed()
                                    .setAuthor({ name: `${settings.SERVER_NAME} | Server Application`, iconURL: settings.SERVER_LOGO })
                                    .setColor("BLURPLE")
                                    .setThumbnail(settings.SERVER_LOGO)
                                    .setFooter({ text: "Test" ? `${settings.SERVER_NAME}` : `${settings.SERVER_NAME}` })
                                    .setTimestamp(new Date())
                                    .setTitle(`DHRUVAM APPLICATIONS`)
                                    .addFields(
                                        { name: '\n\u200b\nServer Name', value: `\`\`\`${settings.SERVER_NAME}\`\`\``, inline: false }
                                    )
                                    .addFields(
                                        { name: '\n\u200b\nPing', value: `\`\`\`Check the bot status\`\`\``, inline: false },
                                        { name: '\n\u200b\nWhiteList', value: `\`\`\`You can apply whitelist in here\`\`\``, inline: false }
                                    )
                            ],
                            components: [btnrow],
                        });

                        interaction.reply({
                            content: `> Setup in ${applyChannel}`,
                        });
                    }
                    break;
                case "ping":
                    {
                        interaction.reply({
                            content: `pong :: ${client.ws.ping}`,
                            ephemeral: true,
                        });
                    }
                    break;

                case "acceptwl":
                    {
                        const user = interaction.options.getMember('member');

                        let acceptchannel = interaction.guild.channels.cache.get(
                            settings.acceptChannel
                        );

                        //if (user) {
                            //await interaction.reply({
                                //content: `The Message has been sent`,
                                //ephemeral: true,
                            //});
                        //}

                        const acceptEmbed = new MessageEmbed()
                            .setColor("GREEN")
                            .setAuthor({ name: 'DHRUVAM', iconURL: 'https://media.discordapp.net/attachments/721682179767271475/1067366483493126154/1.png' })
                            .setThumbnail(`${user.user.avatarURL()}`)
                            .addFields([
                                {
                                    name: '\n\u200b\nServer Name ',
                                    value: `\`\`\`DHRUVAM\`\`\``,
                                    inline: false
                                },
                                {
                                    name: '\n\u200b\nWhitelist Status',
                                    value: `\`\`\`✅ Accepted\`\`\``,
                                    inline: true
                                },
                            ])
                            
                            .setImage('https://media.discordapp.net/attachments/1073973597372166225/1073982624848158790/20230205_104449.jpg')
                            .setTimestamp()
                            .setFooter({ text: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

                            acceptchannel.send({ content: `<@${user.user.id}>  𝙔𝙊𝙐𝙍 𝙑𝙄𝙎𝘼 𝙃𝘼𝙎 𝘽𝙀𝙀𝙉 𝘼𝘾𝘾𝙀𝙋𝙏𝙀𝘿. 𝙀𝙉𝙅𝙊𝙔 𝘿𝙃𝙍𝙐𝙑𝘼𝙈 𝙍𝙊𝙇𝙀𝙋𝙇𝘼𝙔.`, embeds: [acceptEmbed] });

                        await user.roles.add(settings.whitelistrole).catch(e => { })
                        await user.roles.remove(settings.pendingrole).catch(e => { })
                        await user.send({content: `<@${user.user.id}>  𝙔𝙊𝙐𝙍 𝙑𝙄𝙎𝘼 𝙃𝘼𝙎 𝘽𝙀𝙀𝙉 𝘼𝘾𝘾𝙀𝙋𝙏𝙀𝘿. 𝙀𝙉𝙅𝙊𝙔 𝘿𝙃𝙍𝙐𝙑𝘼𝙈 𝙍𝙊𝙇𝙀𝙋𝙇𝘼𝙔.`, embeds: [acceptEmbed]})


                    }
                    break;

                case "rejectwl":
                    {
                        interaction.reply({
                            content: `pong :: ${client.ws.ping}`,
                            ephemeral: true,
                        });
                    }
                    break;

                case "pendingwl":
                    {
                        interaction.reply({
                            content: `pong :: ${client.ws.ping}`,
                            ephemeral: true,
                        });
                    }
                    break;

                default:
                    interaction.reply({
                        content: `command not found ${interaction.commandName}`,
                        ephemeral: true,
                    });
                    break;
            }
        }

        // for buttons
        if (interaction.isButton()) {
            switch (interaction.customId) {
                case "ap_ping":
                    {
                        interaction.reply({
                            content: `Hai i am online, now you can apply`,
                            ephemeral: true,
                        });
                    }
                    break;

                case "ap_apply":
                    {
                        let application_modal = new Modal()
                            .setTitle(`Whitelist Applications`)
                            .setCustomId(`application_modal`);

                        const user_name = new TextInputComponent()
                            .setCustomId("ap_username")
                            .setLabel(`What is your name ?`.substring(0, 45))
                            .setMinLength(4)
                            .setMaxLength(25)
                            .setRequired(true)
                            .setPlaceholder(`Enter you real name`)
                            .setStyle("SHORT");

                        const user_age = new TextInputComponent()
                            .setCustomId("ap_userage")
                            .setLabel(`What is your real Age`.substring(0, 45))
                            .setMinLength(1)
                            .setMaxLength(2)
                            .setRequired(true)
                            .setPlaceholder(`Enter you Age`)
                            .setStyle("SHORT");

                        const user_ingameName = new TextInputComponent()
                            .setCustomId("ap_useringameName")
                            .setLabel(`What is your in-game Name ?`.substring(0, 45))
                            .setMinLength(4)
                            .setMaxLength(30)
                            .setRequired(true)
                            .setPlaceholder(`Enter your in-game Name`)
                            .setStyle("SHORT");

                        const user_email = new TextInputComponent()
                            .setCustomId("ap_useremail")
                            .setLabel(`What is your email-ID`.substring(0, 45))
                            .setMinLength(10)
                            .setMaxLength(50)
                            .setRequired(true)
                            .setPlaceholder(`Enter your email address`)
                            .setStyle("SHORT");

                        const user_exp = new TextInputComponent()
                            .setCustomId("ap_userexp")
                            .setLabel(`What is your roleplay experince`.substring(0, 45))
                            .setMinLength(15)
                            .setMaxLength(50)
                            .setRequired(true)
                            .setPlaceholder(`Enter your current roleplay experince`)
                            .setStyle("PARAGRAPH");



                        let row_username = new MessageActionRow().addComponents(user_name);
                        let row_userage = new MessageActionRow().addComponents(user_age);
                        let row_useringameName = new MessageActionRow().addComponents(user_ingameName);
                        let row_useremail = new MessageActionRow().addComponents(user_email);
                        let row_userexp = new MessageActionRow().addComponents(user_exp);
                        application_modal.addComponents(row_username, row_userage, row_useringameName, row_useremail, row_userexp);

                        await interaction.showModal(application_modal);

                        console.log(`Whitelist button is clicked by : ${interaction.user.username}`)
                    }
                    break;
                case "ap_pending":
                    {
                        let embed = new MessageEmbed(
                            interaction.message.embeds[0]
                        ).setColor("YELLOW");

                        interaction.message.edit({
                            embeds: [embed],
                            components: [],
                        });

                        let ap_user = interaction.guild.members.cache.get(
                            embed.footer.text
                        );

                        let pendingchannel = interaction.guild.channels.cache.get(
                            settings.pendingChannel
                        );

                        enqcode = embed.fields[0].value
                        sliced_enq = enqcode.slice(3,7)

                        const pendingEmbed = new MessageEmbed()
                            .setColor("YELLOW")
                            .setAuthor({ name: 'DHRUVAM', iconURL: 'https://media.discordapp.net/attachments/721682179767271475/1067366483493126154/1.png' })
                            .setThumbnail(`${ap_user.user.avatarURL()}`)
                            .addFields([
                                {
                                    name: '\n\u200b\nServer Name ',
                                    value: `\`\`\`DHRUVAM\`\`\``,
                                    inline: false
                                },
                                {
                                    name: '\n\u200b\nWhitelist Status',
                                    value: `\`\`\`⌛ Pending\`\`\``,
                                    inline: true
                                },
                                {
                                    name: '\n\u200b\nEnquiry ID',
                                    value: `\`\`\`${sliced_enq}\`\`\``,
                                    inline: true
                                },
                            ])
                            
                            .setImage('https://media.discordapp.net/attachments/1073973597372166225/1073982625288556594/20230205_104459.jpg')
                            .setTimestamp()
                            .setFooter({ text: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
                        pendingchannel.send({ content: `<@${ap_user.user.id}>  𝙔𝙊𝙐𝙍 𝙑𝙄𝙎𝘼 𝘼𝙋𝙋𝙇𝙄𝘾𝘼𝙏𝙄𝙊𝙉 𝙃𝘼𝙎  𝘽𝙀𝙀𝙉 𝘼𝘾𝘾𝙀𝙋𝙏𝙀𝘿. 𝙑𝙄𝙎𝙄𝙏 <#1000400547897163796> 𝙏𝙊 𝘾𝙊𝙈𝙋𝙇𝙀𝙏𝙀 𝙏𝙃𝙀 𝙋𝙍𝙊𝘾𝙀𝘿𝙐𝙍𝙀.`, embeds: [pendingEmbed] });
                        ap_user.send({embeds: [pendingEmbed]}).catch(e => { })
                        await ap_user.roles.add(settings.pendingrole).catch(e => { })
                        /*await interaction.member.roles.remove(settings.waitingrole).catch(e => { })*/
                    }
                    break;
                case "ap_reject":
                    {
                        let reject_reason_modal = new Modal()
                            .setTitle(`Whitelist Applications reject`)
                            .setCustomId(`reject_reason_modal`);

                        const reject_reason = new TextInputComponent()
                            .setCustomId("ap_reject_reason")
                            .setLabel(`What is the reason for rejection ?`.substring(0, 45))
                            .setMinLength(5)
                            .setMaxLength(50)
                            .setRequired(true)
                            .setPlaceholder(`Enter rejection details`)
                            .setStyle("SHORT");

                        let row_reject_reason = new MessageActionRow().addComponents(reject_reason);
                        reject_reason_modal.addComponents(row_reject_reason);

                        await interaction.showModal(reject_reason_modal);
                    }
                default:
                    break;
            }
        }

        // for modals
        if (interaction.isModalSubmit()) {
            if (interaction.customId === 'application_modal') {
                let user_name = interaction.fields.getTextInputValue("ap_username");
                let user_age = interaction.fields.getTextInputValue("ap_userage");
                let user_ingameName = interaction.fields.getTextInputValue("ap_useringameName");
                let user_email = interaction.fields.getTextInputValue("ap_useremail");
                let user_exp = interaction.fields.getTextInputValue("ap_userexp");
                let finishChannel = interaction.guild.channels.cache.get(
                    settings.finishChannel
                );
                if (!finishChannel) return;
                let btnrow = new MessageActionRow().addComponents([
                    new MessageButton()
                        .setStyle("SECONDARY")
                        .setCustomId("ap_pending")
                        .setLabel("Pending")
                        .setEmoji("⌛"),
                    new MessageButton()
                        .setStyle("SECONDARY")
                        .setCustomId("ap_reject")
                        .setLabel("Reject")
                        .setEmoji("❌"),
                ]);

                const fileName = 'Database.json';
                var rowdata = fs.readFileSync(fileName, 'utf8'); // This will block the event loop, not recommended for non-cli programs.
                var data = JSON.parse(rowdata);
                var valueofwlid = data.id

                finishChannel.send({
                    content: `Whitelist Application From <@${interaction.user.id}> \n<@&1048119915707650118> <@&1073226772801409117> <@&981442795229306912>`,
                    embeds: [
                        new MessageEmbed()
                            .setAuthor({ name: `${settings.SERVER_NAME} | Server Application Log`, iconURL: settings.SERVER_LOGO })
                            .setColor("BLURPLE")
                            .setThumbnail(settings.SERVER_LOGO)
                            .setFooter({ text: "Test" ? `${settings.SERVER_NAME}` : `${settings.SERVER_NAME}` })
                            .setTimestamp(new Date())
                            .setTitle(`DHRUVAM APPLICATIONS LOGS`)
                            .addFields([
                                {
                                    name: '\n\u200b\nEnquiry ID',
                                    value: `\`\`\`${valueofwlid}\`\`\``,
                                    inline: false
                                },
                                {
                                    name: '\n\u200b\nWhat is your name?',
                                    value: `\`\`\`${user_name}\`\`\``,
                                    inline: false
                                },
                                {
                                    name: '\n\u200b\nWhat is your age?',
                                    value: `\`\`\`${user_age}\`\`\``,
                                    inline: false
                                },
                                {
                                    name: '\n\u200b\nWhat is your in-game Name ?',
                                    value: `\`\`\`${user_ingameName}\`\`\``,
                                    inline: false
                                },
                                {
                                    name: '\n\u200b\nWhat is your email-ID',
                                    value: `\`\`\`${user_email}\`\`\``,
                                    inline: false
                                },
                                {
                                    name: '\n\u200b\nWhat is your roleplay experince',
                                    value: `\`\`\`${user_exp}\`\`\``,
                                    inline: false
                                },

                            ])

                            .setFooter({
                                text: `${interaction.user.id}`,
                                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
                            }),
                    ],
                    components: [btnrow],
                });

                interaction.reply({
                    content: `Thank you for your application with code **#${valueofwlid}** ! We'll review it and be in touch.`,
                    ephemeral: true,
                });

                let updateingvalue = {
                    id: valueofwlid + 1
                }
                let encryptdata = JSON.stringify(updateingvalue);
                fs.writeFileSync(fileName, encryptdata);

                interaction.user.send({
                    content: `Thank you for your application with code **#${valueofwlid}** ! We'll review it and be in touch.`,
                    embeds: [
                        new MessageEmbed()
                            .setAuthor({ name: `${settings.SERVER_NAME} | Server Application`, iconURL: settings.SERVER_LOGO })
                            .setColor("BLURPLE")
                            .setThumbnail(settings.SERVER_LOGO)
                            .setFooter({ text: "Test" ? `${settings.SERVER_NAME}` : `${settings.SERVER_NAME}` })
                            .setTimestamp(new Date())
                            .setTitle(`DHRUVAM APPLICATIONS`)
                            .addFields([
                                {
                                    name: '\n\u200b\nServer name',
                                    value: `\`\`\`${settings.SERVER_NAME}\`\`\``,
                                    inline: false
                                },
                                {
                                    name: '\n\u200b\nMessage',
                                    value: `\`\`\`Thank you for applying! \nWe will respond shortly.\`\`\``,
                                    inline: true
                                },
                                {
                                    name: '\n\u200b\nEnquiry ID?',
                                    value: `\`\`\`${valueofwlid}\`\`\``,
                                    inline: false
                                },
                            ])

                            .setFooter({
                                text: `${interaction.user.username}`,
                                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
                            }),
                    ],
                }).catch(e => { })

                //await interaction.member.roles.add(settings.waitingrole).catch(e => { })
            } else if (interaction.customId === 'reject_reason_modal') {
                let reject_reasoninput = interaction.fields.getTextInputValue("ap_reject_reason");

                let embed = new MessageEmbed(
                    interaction.message.embeds[0]
                ).setColor("RED");

                interaction.message.edit({
                    embeds: [embed],
                    components: [],
                });

                let ap_user = interaction.guild.members.cache.get(
                    embed.footer.text
                );

                ap_user.send(`Your DHRUVAM whitelist application has been rejected by ${interaction.user.tag}`).catch(e => { })

                let rejectchannel = interaction.guild.channels.cache.get(
                    settings.rejectChannel
                );

                const rejectEmbed = new MessageEmbed()
                    .setColor("RED")
                    .setAuthor({ name: 'DHRUVAM', iconURL: 'https://media.discordapp.net/attachments/721682179767271475/1067366483493126154/1.png' })
                    .setThumbnail(`${ap_user.user.avatarURL()}`)
                    .addFields([
                        {
                            name: '\n\u200b\nServer Name ',
                            value: `\`\`\`DHRUVAM\`\`\``,
                            inline: false
                        },
                        {
                            name: '\n\u200b\nWhitelist Status',
                            value: `\`\`\`❌ Rejected\`\`\``,
                            inline: true
                        },
                        {
                            name: '\n\u200b\nReason',
                            value: `\`\`\`${reject_reasoninput}\`\`\``,
                            inline: true
                        },
                    ])
                    .setImage('https://media.discordapp.net/attachments/1060068045843861514/1073995105259749467/20230211_212249.jpg')
                    .setTimestamp()
                    .setFooter({ text: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
                rejectchannel.send({ content: `<@${ap_user.user.id}> 𝗬𝗢𝗨𝗥 𝗪𝗛𝗜𝗧𝗘𝗟𝗜𝗦𝗧 𝗪𝗔𝗦 𝗥𝗘𝗝𝗘𝗖𝗧𝗘𝗗..`, embeds: [rejectEmbed] });

            }
        }
    });
};
