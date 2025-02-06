const { ActionRowBuilder, TextInputBuilder, ModalBuilder, TextInputStyle } = require("discord.js");
const questions = require("../../modal/whitelist/questions");
const config = require("../../../config/config");

module.exports = {
    id: 'whitelist_open_questions_button',
    async execute(interaction) {

        const modal = new ModalBuilder()
            .setCustomId(questions.id)
            .setTitle(config.whitelist.modal_title)

        config.whitelist.questions.slice(0, 5).forEach(question => {
            const input = new TextInputBuilder()
            .setCustomId(question.key)
            .setLabel(question.question)
            .setStyle(question.type)
            .setPlaceholder(question.placeholder)
            .setRequired(question.required);

            const actionRow = new ActionRowBuilder().addComponents(input);
            modal.addComponents(actionRow);
        });

        await interaction.showModal(modal);
    }
}