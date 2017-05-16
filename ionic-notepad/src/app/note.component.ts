import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Note } from './note'
import { Category } from './category'
import { NoteService } from './note.service';

@Component({
  selector: 'note',
  templateUrl: 'app/templates/note.html',
})
export class NoteComponent  {
    @Input() note: Note;
    @Input() categories: Category[];
    @Output() deleteEvent: EventEmitter<any> = new EventEmitter();

    hideEditor: boolean = true;

    constructor(private noteService: NoteService) { }

    delete() {
        // TODO: make ajax request to remove the note.
        this.deleteEvent.emit(this.note);
    }

    onSubmitEvent(note: Note) {
        this.hideEditor = true;

        if (note == null) {
            return;
        }

        this.noteService.updateNote(note).subscribe(
            data => console.log(data),
            err => console.log(err),
            () => console.log('note updated!')
        );
    }
}
