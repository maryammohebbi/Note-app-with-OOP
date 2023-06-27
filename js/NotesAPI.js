const notes =[  
    {
        id: 1,
        title: "first note",
        body: "some dummy text ... first",
        updated: "2023-03-14T18:24:01.4117",
    },
    {
        id: 2,
        title: "second note",
        body: "some dummy text... second",
        updated: "2023-04-19T15:03:23.556Z",
    },

    {
        id: 3,
        title: "third note",
        body: "some dummy text ... third",
        updated: "2023-04-19T02:32:36.154Z" ,
    },
];


export default class NotesAPI{
    static getAllNotes(){
        const savedNotes = JSON.parse(localStorage.getItem("notes-app")) || [];
        return savedNotes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }

    static saveNote(noteToSave){
        //1. existed or 2. not

        const notes = NotesAPI.getAllNotes();

        const existedNote = notes.find((n)=> n.id == noteToSave.id); // check mikone aayaa baa oon chizi ke karbar ferestaade yeki hast yaa na.

        if(existedNote){
            existedNote.title = noteToSave.title;
            existedNote.body = noteToSave.body;
            existedNote.updated = new Date().toISOString();
        }else{
            noteToSave.id = new Date().getTime();
            noteToSave.updated = new Date().toISOString();
            // title, body, id, updated => new note!
            notes.push(noteToSave);
        }
        localStorage.setItem("notes-app", JSON.stringify(notes));
    }

    static deleteNote(id){
        const notes = NotesAPI.getAllNotes();
        const filteredNotes = notes.filter((n) => n.id !== id);
        localStorage.setItem("notes-app", JSON.stringify(filteredNotes));
    }
    
}