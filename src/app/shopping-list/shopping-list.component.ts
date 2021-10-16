import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './services/shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  private ingUnscription!: Subscription;  // Using Subject unscribe Subscription.

  // ingredients: Ingredient[] = [
  //   new Ingredient('Apple', 5),
  //   new Ingredient('Banana', 10)
  // ];

  constructor(private shopping: ShoppingService) { }

  ngOnInit(): void {
    this.ingredients = this.shopping.getIngredients();
    this.ingUnscription = this.shopping.ingredientsChanged.subscribe((ingredients: Ingredient[] ) => {
      this.ingredients = ingredients;
    });
  }

  newIngredient(ingredient: Ingredient) {
    //this.ingredients.push(ingredient);
    this.shopping.addIngredient(ingredient);
  }

  // On click edit Item V:219
  onEditItem(index: number) {
    this.shopping.startedEditing.next(index);   // set value in Subject of service variable
  }

  ngOnDestroy() {
      this.ingUnscription.unsubscribe();
  }
}