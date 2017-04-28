import { Component } from '@angular/core';

import { Category } from './category'
import { CategoryService } from './category.service'

const CATEGORIES: Category[] = [
    new Category(24, 'category'),
    new Category(34, 'test')
];

@Component({
  selector: 'category-list',
  templateUrl: 'app/templates/category-list.html',
  providers: [CategoryService],
})
export class CategoryListComponent  {
    categories: Category[];

    hideCategoryEditor = true;
    updateCategory: Category = new Category(-1, '');
    oldCategory: Category = null;

    constructor(private categoryService: CategoryService) { }

    ngOnInit() {
        // Get categories.
        this.categoryService.getCategories().subscribe(
            data => { this.categories = JSON.parse(data); },
            err => console.log(err),
            () => console.log('done fetching categories')
        );
    }

    public addCategory() {
        this.hideCategoryEditor = false;
        this.updateCategory = new Category(-1, '');
        this.oldCategory = null;
    }

    public delete(event:any, category:Category) {
        let index = this.categories.findIndex((n) => (n === category));
        if (index != -1) {
            this.categories.splice(index, 1);
        }
    }

    public edit(event:any, category:Category) {
        this.hideCategoryEditor = !this.hideCategoryEditor;
        this.updateCategory = category;
        // Clone object.
        this.oldCategory = Object.assign({}, category);
    }

    public onCategoryUpdate() {
        this.hideCategoryEditor = true;

        if (this.updateCategory.id == -1) {
            this.updateCategory.id = 0
            this.categories.push(this.updateCategory);
        }
    }

    public cancelUpdate() {
        let index = this.categories.findIndex((n) => (n.id === this.updateCategory.id));
        if (index != -1 && this.oldCategory != null) {
            this.categories[index] = this.oldCategory;
        }
        this.oldCategory = null;
    }
}
