const commands = [
  {
    name: "ping",
    description: "this is a test command",
  },
  {
    name: "setup",
    description: "This command will send a message to the dedicated channel",
  },
  {
    name: "acceptwl",
    description:
      "This will give whitelist role to mentioned user and automatically send whitelist message to channel",
    options: [
      {
        name: "user",
        description: "The user you want to give WHITELIST",
        type: 6,
        required: true,
      },
    ],
  },
];

module.exports = commands;
