import { Component } from '@angular/core';

import { Category } from './category'
import { CategoryService } from './category.service'

import { ToastController } from 'ionic-angular';

@Component({
  selector: 'category-list',
  templateUrl: 'app/templates/category-list.html',
  providers: [CategoryService],
})
export class CategoryListComponent  {
    categories: Category[];

    hideCategoryEditor = true;
    updateCategory: Category = Category.getEmpty();
    oldCategory: Category = null;

    constructor(
        private categoryService: CategoryService,
        private toast: ToastController) { }

    ngOnInit() {
        this.update();
    }

    update() {
        // Get categories.
        this.categoryService.getCategories().subscribe(
            data => {
                this.categories = JSON.parse(data);
                this.toast.create({
                    message: 'Categories updated',
                    duration: 3000,
                    position: 'bottom',
                }).present();
            },
            err => console.log(err),
            () => console.log('done fetching categories')
        );
        console.log(this.categories);
    }

    public addCategory() {
        this.hideCategoryEditor = false;
        this.updateCategory = Category.getEmpty();
        this.oldCategory = null;
    }

    public delete(event:any, category:Category) {
        let index = this.categories.findIndex((n) => (n === category));
        if (index != -1) {
            this.categoryService.deleteCategory(this.categories[index]).subscribe(
                data => this.update(),
                err => console.log(err),
                () => console.log('category successfully deleted')
            );
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
            // We should create a new category.
            this.categories.push(this.updateCategory);
            this.categoryService.createCategory(this.updateCategory).subscribe(
                data => this.update(),
                err => console.log(err),
                () => console.log('category successfully created')
            );
        } else {
            // We should update the category.
            this.categoryService.updateCategory(this.updateCategory).subscribe(
                data => this.update(),
                err => console.log(err),
                () => console.log('category successfully updated')
            );

            let index = this.categories.findIndex((n) => (n === this.updateCategory));
            this.categories[index] = this.updateCategory;
        }
        setTimeout(() => this.update, 500);
    }

    public cancelUpdate() {
        this.hideCategoryEditor = true;

        let index = this.categories.findIndex((n) => (n.id === this.updateCategory.id));
        if (index != -1 && this.oldCategory != null) {
            this.categories[index] = this.oldCategory;
        }
        this.oldCategory = null;
    }
}
