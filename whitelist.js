require('dotenv').config();
const { Client, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const fs = require("fs");

/**
 *
 * @param {Client} client
 */
module.exports = async (client) => {
  // code

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand() && !interaction.isButton() && !interaction.isModalSubmit() && !interaction.showModal()) return;
    if (interaction.isCommand()) {
      if (interaction.commandName == "setup") {
        let applyChannel = client.channels.cache.get(process.env.ApplyChannel)
        if (!applyChannel) return;

        let hasRole = interaction.member.roles.cache.has(process.env.InteractionRole);
        if (hasRole) {

          let btnrow = new ActionRowBuilder().addComponents([
            new ButtonBuilder()
              .setStyle(ButtonStyle.Primary)
              .setCustomId("ap_apply")
              .setLabel("Apply WhiteList")
              .setEmoji("📑"),
          ]);
          applyChannel.send({
            embeds: [
              new EmbedBuilder()
                .setTitle(`DHRUVAM APPLICATIONS`)
                .setAuthor({ name: `${process.env.ServerName} | Server Application`, iconURL: process.env.ServerLogo })
                .setColor("#00e5ff")
                .setThumbnail("https://ik.imagekit.io/ipuppyyt/Dhruvam/123444d_43EFIfH9Q-.webp")
                .setImage('https://ik.imagekit.io/ipuppyyt/Dhruvam/DR3P1234j_TqGJUBxWjy.webp')
                .setFooter({ text: "Test" ? `${process.env.ServerName}` : `${process.env.ServerName}` })
                .setTimestamp(new Date())
            ],
            components: [btnrow],
          });

          interaction.reply({
            content: `> Setup in ${applyChannel}`,
          });

        } else {
          interaction.reply({
            content: `You don't have the privilage to do this command contact Admins for more information`,
            ephemeral: true,
          });
        }
      } else if (interaction.commandName == "acceptwl") {
        await interaction.deferReply({ ephemeral: true });

        let hasRole = interaction.member.roles.cache.has(process.env.InteractionRole);
        if (hasRole) {

          const user = interaction.options.getMember('user');

          let acceptchannel = interaction.guild.channels.cache.get(
            process.env.AcceptChannel
          );

          const acceptEmbed = new EmbedBuilder()
            .setColor("#00d0ff")
            .setAuthor({ name: 'DHRUVAM', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setImage('https://ik.imagekit.io/ipuppyyt/Dhruvam/34Untitled-1_MdzWv8Q4U.webp')
            .addFields([
              {
                name: '\n\u200b\nServer Name ',
                value: `\`\`\`DHRUVAM\`\`\``,
                inline: false
              },
              {
                name: '\n\u200b\nWhitelist Status',
                value: `\`\`\`✅ WHITELISTED\`\`\``,
                inline: true
              },
            ])
            .setTimestamp()
            .setFooter({ text: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
          try {
            await user.roles.add(process.env.WhiteListRole).catch(e => { console.log(e) })
            await user.roles.remove(process.env.PendingRole).catch(e => { console.log(e) })
            acceptchannel.send({ content: `<@${user.user.id}>  𝙔𝙊𝙐𝙍 𝙑𝙄𝙎𝘼 𝙃𝘼𝙎 𝘽𝙀𝙀𝙉 𝘼𝘾𝘾𝙀𝙋𝙏𝙀𝘿. 𝙀𝙉𝙅𝙊𝙔 𝘿𝙃𝙍𝙐𝙑𝘼𝙈 𝙍𝙊𝙇𝙀𝙋𝙇𝘼𝙔.`, embeds: [acceptEmbed] });
            await user.send({ content: `<@${user.user.id}>  𝙔𝙊𝙐𝙍 𝙑𝙄𝙎𝘼 𝙃𝘼𝙎 𝘽𝙀𝙀𝙉 𝘼𝘾𝘾𝙀𝙋𝙏𝙀𝘿. 𝙀𝙉𝙅𝙊𝙔 𝘿𝙃𝙍𝙐𝙑𝘼𝙈 𝙍𝙊𝙇𝙀𝙋𝙇𝘼𝙔.`, embeds: [acceptEmbed] })
            interaction.editReply({
              content: `The message has been send on <#${process.env.AcceptChannel}>`,
              ephemeral: true,
            });
            return;
          } catch (error) {
            if (error.code === 50007) {
              interaction.editReply({
                content: `The mentioned user has blocked their DMs. Don't worry, the role has been added.`,
                ephemeral: true,
              });
            } else {
              interaction.reply({
                content: `An error occurred while processing your request.`,
                ephemeral: true,
              }).catch(e => {
                interaction.editReply({ content: `An error occurred while processing your request.`, ephemeral: true });
              });
            }
            return;
          }
        } else {
          interaction.reply({
            content: `You don't have the privilage to do this command contact <@813966990674493511> or other admins for more information`,
            ephemeral: true,
          });
        }

      }


      //For Form Opening were handled by here and other button events


    } else if (interaction.isButton()) {
      if (interaction.customId == "ap_apply") {
        let application_modal = new ModalBuilder()
          .setTitle(`Whitelist Applications`)
          .setCustomId(`application_modal`);

        const user_name = new TextInputBuilder()
          .setCustomId("ap_username")
          .setLabel(`What is your name ?`.substring(0, 45))
          .setMinLength(4)
          .setMaxLength(25)
          .setRequired(true)
          .setPlaceholder(`Enter you real name`)
          .setStyle(TextInputStyle.Short);

        const user_age = new TextInputBuilder()
          .setCustomId("ap_userage")
          .setLabel(`What is your real Age`.substring(0, 45))
          .setMinLength(1)
          .setMaxLength(2)
          .setRequired(true)
          .setPlaceholder(`Enter you Age`)
          .setStyle(TextInputStyle.Short);

        const user_ingameName = new TextInputBuilder()
          .setCustomId("ap_useringameName")
          .setLabel(`What is your in-game Name ?`.substring(0, 45))
          .setMinLength(4)
          .setMaxLength(30)
          .setRequired(true)
          .setPlaceholder(`Enter your in-game Name`)
          .setStyle(TextInputStyle.Short);

        const user_email = new TextInputBuilder()
          .setCustomId("ap_useremail")
          .setLabel(`What is your email-ID`.substring(0, 45))
          .setMinLength(10)
          .setMaxLength(50)
          .setRequired(true)
          .setPlaceholder(`Enter your email address`)
          .setStyle(TextInputStyle.Short);

        const user_exp = new TextInputBuilder()
          .setCustomId("ap_userexp")
          .setLabel(`What is your roleplay experince`.substring(0, 45))
          .setMinLength(6)
          .setMaxLength(1000)
          .setRequired(true)
          .setPlaceholder(`Enter your current roleplay experince`)
          .setStyle(TextInputStyle.Paragraph);



        let row_username = new ActionRowBuilder().addComponents(user_name);
        let row_userage = new ActionRowBuilder().addComponents(user_age);
        let row_useringameName = new ActionRowBuilder().addComponents(user_ingameName);
        let row_useremail = new ActionRowBuilder().addComponents(user_email);
        let row_userexp = new ActionRowBuilder().addComponents(user_exp);
        application_modal.addComponents(row_username, row_userage, row_useringameName, row_useremail, row_userexp);

        try {
          await interaction.showModal(application_modal);
        } catch (error) {
          console.error('Error Showing Modals:', error);
        }
      } else if (interaction.customId == "ap_pending") {
        let embed = new EmbedBuilder(
          interaction.message.embeds[0]
        ).setColor("Yellow");

        interaction.message.edit({
          embeds: [embed],
          components: [],
        });


        let ap_user = interaction.guild.members.cache.get(
          embed.data.footer.text
        );

        let pendingchannel = interaction.guild.channels.cache.get(
          process.env.PendingChannel
        );

        enqcode = embed.data.fields[0].value
        sliced_enq = enqcode.slice(3, 7)

        const pendingEmbed = new EmbedBuilder()
          .setColor("Yellow")
          .setAuthor({ name: 'DHRUVAM', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
          .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
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

          .setImage('https://ik.imagekit.io/ipuppyyt/Dhruvam/U4ntitled-1_Il7c7B_QV.webp')
          .setTimestamp()
          .setFooter({ text: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

        try {
          await ap_user.roles.add(process.env.PendingRole).catch(e => { })
          pendingchannel.send({ content: `<@${ap_user.user.id}>  𝙔𝙊𝙐𝙍 𝙑𝙄𝙎𝘼 𝘼𝙋𝙋𝙇𝙄𝘾𝘼𝙏𝙄𝙊𝙉 𝙃𝘼𝙎  𝘽𝙀𝙀𝙉 𝘼𝘾𝘾𝙀𝙋𝙏𝙀𝘿. 𝙑𝙄𝙎𝙄𝙏 <#1000400547897163796> 𝙏𝙊 𝘾𝙊𝙈𝙋𝙇𝙀𝙏𝙀 𝙏𝙃𝙀 𝙋𝙍𝙊𝘾𝙀𝘿𝙐𝙍𝙀.`, embeds: [pendingEmbed] });
          ap_user.send({ content: `<@${ap_user.user.id}>  𝙔𝙊𝙐𝙍 𝙑𝙄𝙎𝘼 𝘼𝙋𝙋𝙇𝙄𝘾𝘼𝙏𝙄𝙊𝙉 𝙃𝘼𝙎  𝘽𝙀𝙀𝙉 𝘼𝘾𝘾𝙀𝙋𝙏𝙀𝘿. 𝙑𝙄𝙎𝙄𝙏 <#1000400547897163796> 𝙏𝙊 𝘾𝙊𝙈𝙋𝙇𝙀𝙏𝙀 𝙏𝙃𝙀 𝙋𝙍𝙊𝘾𝙀𝘿𝙐𝙍𝙀.`, embeds: [pendingEmbed] });
        } catch (error) {
          if (error.code === 50007) {
            interaction.reply({
              content: `The mentioned user has blocked their DMs. Don't worry, the role has been added.`,
              ephemeral: true,
            });
          } else {
            interaction.reply({
              content: `An error occurred while processing your request.`,
              ephemeral: true,
            });
          }
          return;
        }
      } else if (interaction.customId == "ap_reject") {
        let reject_reason_modal = new ModalBuilder()
          .setTitle(`Whitelist Applications reject`)
          .setCustomId(`reject_reason_modal`);

        const reject_reason = new TextInputBuilder()
          .setCustomId("ap_reject_reason")
          .setLabel(`What is the reason for rejection ?`.substring(0, 45))
          .setMinLength(5)
          .setMaxLength(50)
          .setRequired(true)
          .setPlaceholder(`Enter rejection details`)
          .setStyle(TextInputStyle.Short);

        let row_reject_reason = new ActionRowBuilder().addComponents(reject_reason);
        reject_reason_modal.addComponents(row_reject_reason);

        try {
          await interaction.showModal(reject_reason_modal);
        } catch (error) {
          console.error('Error showing Reject Modal:', error);

          // If you catch an error here, it might indicate that the user has blocked DMs
        }
      }

      //For Data Submition to the dedicated channel

    } else if (interaction.isModalSubmit()) {

      if (interaction.customId === 'application_modal') {
        let user_name = interaction.fields.getTextInputValue("ap_username");
        let user_age = interaction.fields.getTextInputValue("ap_userage");
        let user_ingameName = interaction.fields.getTextInputValue("ap_useringameName");
        let user_email = interaction.fields.getTextInputValue("ap_useremail");
        let user_exp = interaction.fields.getTextInputValue("ap_userexp");
        let finishChannel = interaction.guild.channels.cache.get(
          process.env.LogChannel
        );
        if (!finishChannel) return;
        let btnrow = new ActionRowBuilder().addComponents([
          new ButtonBuilder()
            .setStyle(ButtonStyle.Success)
            .setCustomId("ap_pending")
            .setLabel("Pending")
            .setEmoji("⌛"),
          new ButtonBuilder()
            .setStyle(ButtonStyle.Danger)
            .setCustomId("ap_reject")
            .setLabel("Reject")
            .setEmoji("✖️"),
        ]);

        const fileName = 'Database.json';
        var rowdata = fs.readFileSync(fileName, 'utf8'); // This will block the event loop, not recommended for non-cli programs.
        var data = JSON.parse(rowdata);
        var valueofwlid = data.id

        finishChannel.send({
          content: `Whitelist Application From <@${interaction.user.id}> \n<@&1048119915707650118> <@&1130791882558025728> <@&981442795229306912>`,
          embeds: [
            new EmbedBuilder()
              .setAuthor({ name: `${process.env.ServerName} | Server Application Log`, iconURL: process.env.ServerLogo })
              .setColor("Blue")
              .setThumbnail(process.env.ServerLogo)
              .setFooter({ text: "Test" ? `${process.env.ServerName}` : `${process.env.ServerName}` })
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
          content: `Thank you for your whitelist application. We'll review it and be in touch.`,
          embeds: [
            new EmbedBuilder()
              .setAuthor({ name: `${process.env.ServerName} | Server Application`, iconURL: process.env.ServerLogo })
              .setColor("Blue")
              .setThumbnail(process.env.ServerLogo)
              .setFooter({ text: "Test" ? `${process.env.ServerName}` : `${process.env.ServerName}` })
              .setTimestamp(new Date())
              .setTitle(`DHRUVAM APPLICATIONS`)
              .addFields([
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
      } else if (interaction.customId === 'reject_reason_modal') {
        let reject_reasoninput = interaction.fields.getTextInputValue("ap_reject_reason");

        let embed = new EmbedBuilder(
          interaction.message.embeds[0]
        ).setColor("Red");

        interaction.message.edit({
          embeds: [embed],
          components: [],
        });

        let ap_user = interaction.guild.members.cache.get(
          embed.data.footer.text
        );

        try {
          ap_user.send(`Your DHRUVAM whitelist application has been rejected by ${interaction.user.tag}`)
        } catch (error) {
          if (error.code === 50007) {
            interaction.reply({
              content: `The mentioned user has blocked their DMs. Don't worry, the role has been added.`,
              ephemeral: true,
            });
          } else {
            interaction.reply({
              content: `An error occurred while processing your request.`,
              ephemeral: true,
            });
          }
        }

        let rejectchannel = interaction.guild.channels.cache.get(
          process.env.RejectChannel
        );

        const rejectEmbed = new EmbedBuilder()
          .setColor("Red")
          .setAuthor({ name: 'DHRUVAM', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
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
          .setImage('https://ik.imagekit.io/ipuppyyt/Dhruvam/U55ntitled-1_xgptCrvAd.webp')
          .setTimestamp()
          .setFooter({ text: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
        rejectchannel.send({ content: `<@${ap_user.user.id}> 𝗬𝗢𝗨𝗥 𝗪𝗛𝗜𝗧𝗘𝗟𝗜𝗦𝗧 𝗪𝗔𝗦 𝗥𝗘𝗝𝗘𝗖𝗧𝗘𝗗..`, embeds: [rejectEmbed] });
        ap_user.send({ content: `<@${ap_user.user.id}> 𝗬𝗢𝗨𝗥 𝗪𝗛𝗜𝗧𝗘𝗟𝗜𝗦𝗧 𝗪𝗔𝗦 𝗥𝗘𝗝𝗘𝗖𝗧𝗘𝗗..`, embeds: [rejectEmbed] });
        interaction.reply({
          content: `Reject Message has been sended to rejected channel`,
          ephemeral: true,
        });

      }
    }
  })
};
