import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Note } from './note';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class NoteService {
    constructor(private http: Http) { }

    private BASEURL = 'http://127.0.0.1:8000/api/notes/';

    getNotes() {
        return this.http.get(this.BASEURL)
            .map((res: Response) => res.json());
    }

    getNote(id: Number) {
        return this.http.get(this.BASEURL + id)
            .map((res: Response) => JSON.parse(res.json()));
    }

    createNote(note: Note) {
        return this.http.post(this.BASEURL, this.serialize(note));
    }

    updateNote(note: Note) {
        return this.http.put(this.BASEURL + note.id, this.serialize(note));
    }

    deleteNote(note: Note) {
        return this.http.delete(this.BASEURL + note.id);
    }

    private serialize(note: Note) {
        return JSON.stringify({
            'title': note.title,
            'content': note.content,
            'category': note.category.id,
        });
    }
}
