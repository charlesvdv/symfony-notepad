import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Note } from './note';
import { Category } from './category';

@Component({
  selector: 'note-editor',
  templateUrl: 'app/templates/note_editor.html',
})
export class NoteEditorComponent  {
    @Input() note: Note = Note.getEmpty();
    @Input() categories: Category[];
    @Input() title: string;
    @Output() submitEvent: EventEmitter<any> = new EventEmitter();

    oldNote: Note;

    ngOnInit() {
        this.oldNote = Object.assign({}, this.note);
    }

    onSubmit() {
        this.submitEvent.emit(this.note);
    }

    cancel() {
        this.note.title = this.oldNote.title;
        this.note.category = this.oldNote.category;
        this.note.content = this.oldNote.content;
        this.submitEvent.emit(null);
    }
}
