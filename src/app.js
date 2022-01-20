const yargs = require("yargs");
const { addNotes, readNotes, removeNote, listNotes } = require("../notes");

//add command
yargs.command({
  command: "add",
  describe: "Add Note",
  builder: {
    title: {
      describe: "Add title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Add body",
      deamndOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    addNotes({ title: argv.title, body: argv.body });
  },
});
//remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      demandOption: true,
      type: "string",
    },
  },
  handler: (args) => {
    removeNote(args.title);
  },
});
//read command
yargs.command({
  command: "read",
  describe: "read a note",
  builder: {
    title: {
      demandOption: true,
      type: "string",
    },
  },
  handler: (args) => {
    readNotes(args.title);
  },
});
//list command
yargs.command({
  command: "list",
  describe: "list notes",

  handler: (args) => {
    listNotes();
  },
});
yargs.parse();
//use node src/app.js add --title="Your title" --body="Content" to add a note
//for other options like read,remove and list use title variable only
