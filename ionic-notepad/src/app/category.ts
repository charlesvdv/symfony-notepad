export class Category  {
    constructor(
        public id: number,
        public name: string,
    ) { }

    static getEmpty() {
        return new Category(-1, '');
    }
}

