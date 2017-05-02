import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent }  from './app.component';
import { NoteListComponent } from './notelist.component';
import { CategoryListComponent } from './categorylist.component';
import { NoteComponent } from './note.component';
import { NoteEditorComponent } from './note_editor.component';

const appRoutes = [
    { path: '', component: NoteListComponent, useAsDefault: true, pathMatch: 'full' },
    { path: 'categories', component: CategoryListComponent }
]

@NgModule({
    imports:      [ BrowserModule, FormsModule, RouterModule.forRoot(appRoutes), HttpModule ],
    declarations: [ AppComponent, NoteListComponent, NoteComponent,
        NoteEditorComponent, CategoryListComponent ],
    bootstrap:    [ AppComponent ],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class AppModule { }
