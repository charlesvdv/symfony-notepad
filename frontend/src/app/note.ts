import { Category } from './category';

export class Note  {
    constructor(
        public id: number,
        public title: string,
        public content: string,
        public date: number,
        public category: Category,
    ) { }

    // static getEmpty() {
        // return new Note(-1, '', '', -1, Category.getEmpty())
    // }
}

