import NotesAPI from "./NotesAPI.js";
import NotesView from "./NotesView.js";

export default class App{
    constructor(root){
        this.notes = [];
        this.activeNote = null;
        this.view = new NotesView(root, this._handlers());
        this._refreshNotes();
    }

    _refreshNotes(){
        const notes = NotesAPI.getAllNotes();

        //set notes:
        this.notes = notes;
        this.view.updateNodeList(notes);
        this.view.updateNotePreviewVisibility(notes.length > 0);

        // set active note:
        this.activeNote = notes[0];
        this.view.updateActiveNote(this.activeNote);

    }

    _handlers(){
        return {
            onNoteAdd: () => {
                // console.log("note's been added !");
                const newNote = {
                    title: "عنوان جدید",
                    body: "چیزی بنویسید ..."
                }
                NotesAPI.saveNote(newNote);
                this._refreshNotes();
            },
        
            onNoteEdit: (newTitle, newBody) => {
                // console.log(newTitle, newBody);
            },
        
            onNoteSelect: (noteId) => {
                const selectedNote = this.notes.find((n) => n.id == noteId);
                this.activeNote = selectedNote;
                this.view.updateActiveNote(selectedNote);
            },
        
            onNoteDelete: (noteId) => {
                // console.log(noteId);
            }
        }

    }
}