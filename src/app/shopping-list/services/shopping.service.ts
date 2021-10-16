import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  //ingredientsChanged = new EventEmitter<Ingredient[]>();

  ingredientsChanged = new Subject<Ingredient[]>();

  startedEditing = new Subject<number>();  // v:219  // data sharing sho-list to shop-edit component

  ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Banana', 10)
  ];

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  // get single Ingredient for edit V:220
  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    //this.ingredientsChanged.emit(this.ingredients.slice());
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  // update ingredient V:221  with single button ( Add / Update)
  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  // add ingredients in Shooping List
  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients); // Spread Syntax (operator)
    //this.ingredientsChanged.emit(this.ingredients.slice());
    this.ingredientsChanged.next(this.ingredients.slice());
  }


  // delete Selected ingredient V:224
  delete(index: number) {
    this.ingredients.splice(index, 1);   // splice() used for remove element from Objects
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}
