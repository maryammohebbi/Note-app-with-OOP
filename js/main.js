import NotesAPI from "./NotesAPI.js";
import NotesView from "./NotesView.js";

// console.log(NotesAPI.getAllNotes());

const app = document.getElementById("app");

const view = new NotesView(app, {
    onNoteAdd(){
        console.log("not's been added !");
    },

    onNoteEdit(newTitle, newBody){
        console.log(newTitle, newBody);
    },

    onNoteSelect(noteId){
        console.log(noteId);
    }
});

view.updateNodeList(NotesAPI.getAllNotes());