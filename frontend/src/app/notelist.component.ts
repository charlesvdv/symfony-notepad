import { Component } from '@angular/core';

import { NoteComponent } from './note.component';
import { Note } from './note';
import { Category } from './category'

const CATEGORIES: Category[] = [
    new Category(24, 'category'),
    new Category(34, 'test')
];
const NOTES: Note[] = [
    new Note(3, 'Hi!', 'Content', 2345, CATEGORIES[0]),
    new Note(4, 'friji', 'friejfiejifjei', 542345, CATEGORIES[1])
];

@Component({
  selector: 'note-list',
  templateUrl: 'app/templates/notelist.html',
})
export class NoteListComponent {
    notes = NOTES;
    categories = CATEGORIES;

    hideNewNoteEditor = true;
    newNote: Note = null;

    onDeleteEvent(element: Note) {
        let index = this.notes.findIndex((n) => (n === element));
        if (index != -1) {
            this.notes.splice(index, 1);
        }
    }

    onNewNote(note: Note) {
        console.log(note);
        this.notes.unshift(note);
        this.hideNewNoteEditor = true;
    }
}

