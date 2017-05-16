import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Category } from './category';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CategoryService {
    constructor(private http: Http) { }

    private BASEURL = 'http://127.0.0.1:8000/api/categories/';

    getCategories() {
        return this.http.get(this.BASEURL)
            .map((res: Response) => res.json());
    }

    getCategory(id: Number) {
        return this.http.get(this.BASEURL + id)
            .map((res: Response) => res.json());
    }

    createCategory(category: Category) {
        return this.http.post(this.BASEURL, this.serialize(category));
    }

    updateCategory(category: Category) {
        return this.http.put(this.BASEURL + category.id, this.serialize(category));
    }

    deleteCategory(category: Category) {
        return this.http.delete(this.BASEURL + category.id);
    }

    serialize(category: Category) {
        return {
            'name': category.name
        }
    }
}
