import { Component } from '@angular/core';

import { NoteComponent } from './note.component';
import { Note } from './note';
import { Category } from './category';
import { NoteService } from './note.service';
import { CategoryService } from './category.service';

import { ToastController } from 'ionic-angular';

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

    constructor(
        private noteService: NoteService,
        private categoryService: CategoryService,
        private toast: ToastController) { }

    ngOnInit() {
        this.update();
    }

    update() {
        console.log('calling update');
        // Get notes.
        this.noteService.getNotes().subscribe(
            data => {
                this.notes = JSON.parse(data);
                this.toast.create({
                    message: 'Notes updated',
                    duration: 3000,
                    position: 'bottom',
                }).present();
            },
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
            data => this.update(),
            err => console.log(err),
            () => console.log('note deleted')
        );

        let index = this.notes.findIndex((n) => (n === element));
        if (index != -1) {
            this.notes.splice(index, 1);
        }
        setTimeout(() => this.update, 500);
    }

    onNewNote(note: Note) {
        this.noteService.createNote(note).subscribe(
            data => this.update(),
            err => console.log(err),
            () => console.log('note created!')
        );

        this.notes.push(note);
        this.hideNewNoteEditor = true;
    }
}
