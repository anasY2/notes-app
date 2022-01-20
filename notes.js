const fs = require("fs");
const clc=require('cli-color')
function addNotes({ title, body }) {
  let notes = loadNotes();

  let duplicateNote = notes.find((item) => {
    return item.topic === title;
  });
  if (duplicateNote) {
    return console.log(clc.yellow.inverse("It already exists!"));
  }
  notes.push({ topic: title, todo: body });
  const JSONstring = JSON.stringify(notes);
  fs.writeFileSync("NotesFile/data.json", JSONstring);
  console.log(clc.green.inverse("NOTE ADDED!"));
}
function readNotes(title) {
  try {
    const notes = loadNotes();
    const note = notes.find((item) => {
      return item.topic === title;
    });
    console.log(note.topic);
    console.log(note.todo);
  } catch (error) {
    console.log(clc.red.inverse("OOPS!!cannot get what you are looking for \/(^_^)\/"));
  }
}
function removeNote(title) {
  const notes = loadNotes();
  const newNotes = notes.filter((item) => {
    return item.topic !== title;
  });
  if(newNotes.length === notes.length){
      return console.log(clc.red.inverse("It has already been removed OR DOESN'T EXIST!"));
  }
  const newNotesJSON = JSON.stringify(newNotes);
  fs.writeFileSync("NotesFile/data.json", newNotesJSON);
  console.log(clc.green.inverse("NOTE REMOVED!"));
}
function listNotes() {
    console.log(clc.cyan.bold("YOUR NOTES:"));
  const notes = loadNotes();
  notes.forEach((item) => {
    console.log(item.topic);
  });
}
function loadNotes() {
  try {
    let dataBuffer = fs.readFileSync("NotesFile/data.json");

    let dataJSON = dataBuffer.toString();
    let data = JSON.parse(dataJSON);
    return data;
  } catch (error) {
    return [];
  }
}
module.exports = {
  addNotes: addNotes,
  readNotes: readNotes,
  removeNote: removeNote,
  listNotes: listNotes,
};
