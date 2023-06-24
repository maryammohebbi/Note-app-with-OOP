export default class NotesView{
    constructor(root, handlers){
        this.root = root;
        const {onNoteAdd, onNoteEdit, onNoteSelect, onNoteDelete} = handlers;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteSelect = onNoteSelect;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML = `
        <div class="notes__sidebar">
            <div class="notes__logo">NOTE APP</div>
            <div class="notes__list">
                <div class="notes__list-item"></div>
            </div>
            <button class="notes__add">ADD NOTE</button>
        </div>
        <div class="notes__preview">
            <input type="text" class="notes__title" placeholder="عنوان نوشته..."/>
            <textarea name="" class="notes__body" placeholder="چیزی بنویسید ..."></textarea>
        </div>
        `;

        const addNoteBtn = this.root.querySelector(".notes__add");
        const inputTitle = this.root.querySelector(".notes__title");
        const inputBody = this.root.querySelector(".notes__body");

        addNoteBtn.addEventListener("click", ()=> {
            //run add note methode !
            this.onNoteAdd();
        });
        [inputBody, inputTitle].forEach((inputField) => {
            inputField.addEventListener("blur", ()=>{
                const newBody = inputBody.value.trim();
                const newTitle = inputTitle.value.trim();
                this.onNoteEdit(newBody, newTitle);
            })
        });
        
        // hide notes preview in first loading
        this.updateNotePreviewVisibility(false);
    } 

    _createListItemHTML(id, title, body, updated){
        const MAX_BODY_LENGTH = 50;
        return `
        <div class="notes__list-item" data-note-id="${id}">
            <div class = "notes__item-header">
                <div class="notes__small-title">${title}</div>
                <span class ="notes__list-trash" data-note-id="${id}">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </span>
            </div>
            <div class="notes__small-body">
                ${body.substring(0, MAX_BODY_LENGTH)}
                ${body.length > MAX_BODY_LENGTH ? "..." : ""}
            </div>
            <div class="notes__small-updated">
                ${new Date(updated).toLocaleString("en", {dateStyle: "full", timeStyle:"short"})}
            </div>
        </div>
        `;
    }

    updateNodeList(notes){
        const notesContainer = this.root.querySelector(".notes__list");

        //empty notesContainer
        notesContainer.innerHTML = "";
        let notesList = "";
        for (const note of notes) {
            const {id, title, body, updated} = note;
            const html = this._createListItemHTML(id, title, body, updated);
            notesList += html;
        }
        notesContainer.innerHTML = notesList;
        notesContainer.querySelectorAll(".notes__list-item").forEach((noteItem)=>{
            noteItem.addEventListener("click", ()=>{
                this.onNoteSelect(noteItem.dataset.noteId);
            })
        });

        notesContainer.querySelectorAll(".notes__list-trash").forEach((noteItem) => {
            noteItem.addEventListener("click", (e)=>{
                e.stopPropagation();
                this.onNoteDelete(noteItem.dataset.noteId);
            })
        });
    };

    updateActiveNote(note){
        this.root.querySelector(".notes__title").value = note.title;
        this.root.querySelector(".notes__body").value = note.body;

        //add selected class:
        this.root.querySelectorAll(".notes__list-item").forEach((item) =>{
            item.classList.remove("notes__list-item--selected");
        })

        this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`)
        .classList.add("notes__list-item--selected");

    };

    updateNotePreviewVisibility(visible){
        this.root.querySelector(".notes__preview").style.visibility = visible 
        ? "visible" 
        : "hidden";
    }
}
