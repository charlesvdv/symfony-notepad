import { Component } from '@angular/core';

import { NoteComponent } from './note.component';
import { Note } from './note';
import { Category } from './category';
import { NoteService } from './note.service';
import { CategoryService } from './category.service';

@Component({
  selector: 'note-list',
  templateUrl: 'app/templates/notelist.html',
  providers: [NoteService, CategoryService],
})
export class NoteListComponent {
    notes: Note[];
    categories: Category[];

    hideNewNoteEditor = true;
    newNote: Note = null;

    constructor(private noteService: NoteService, private categoryService: CategoryService) { }

    ngOnInit() {
        this.update();
    }

    update() {
        // Get notes.
        this.noteService.getNotes().subscribe(
            data => { this.notes = JSON.parse(data); },
            err => console.log(err),
            () => console.log('done fetching notes')
        );

        // Get categories.
        this.categoryService.getCategories().subscribe(
            data => { this.categories = JSON.parse(data); },
            err => console.log(err),
            () => console.log('done fetching categories')
        );
    }

    onDeleteEvent(element: Note) {
        this.noteService.deleteNote(element).subscribe(
            data => console.log(data),
            err => console.log(err),
            () => console.log('note deleted')
        );

        let index = this.notes.findIndex((n) => (n === element));
        if (index != -1) {
            this.notes.splice(index, 1);
        }
        this.update();
    }

    onNewNote(note: Note) {
        this.noteService.createNote(note).subscribe(
            data => console.log(data),
            err => console.log(err),
            () => console.log('note created!')
        );

        this.notes.push(note);
        this.hideNewNoteEditor = true;
        this.update();
    }
}

