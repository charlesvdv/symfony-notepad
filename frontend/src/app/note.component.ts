import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Note } from './note'
import { Category } from './category'

@Component({
  selector: 'note',
  templateUrl: 'app/templates/note.html',
})
export class NoteComponent  {
    @Input() note: Note;
    @Input() categories: Category[];
    @Output() deleteEvent: EventEmitter<any> = new EventEmitter();

    hideEditor: boolean = true;

    delete() {
        // TODO: make ajax request to remove the note.
        this.deleteEvent.emit(this.note);
    }

    onSubmitEvent() {
        this.hideEditor = true;
    }
}
