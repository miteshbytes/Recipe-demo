import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from 'src/app/shopping-list/services/shopping.service';
import { Recipe } from '../recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeChanaged = new Subject<Recipe[]>();    // Subject when did update record after new featch array are not be same V:232

  recipeSelected = new EventEmitter<Recipe>();

  // recipes: Recipe[] = [
  //   new Recipe('Test Recipe title', 
  //   'test recipe description', 
  //   'https://www.uaex.edu/life-skills-wellness/food-nutrition/eating-well/EFNEP/images/Recipes-Banner.jpg',
  //   [
  //     new Ingredient('Milk', 20),
  //     new Ingredient('BatterMilk', 102)
  //   ]),
  //   new Recipe('Another Recipe title', 
  //   'another test recipe description', 
  //   'https://cookieandkate.com/images/2020/03/vegan-chana-masala-recipe-2-550x824.jpg',
  //   [
  //     new Ingredient('wheat flour', 5),
  //     new Ingredient('Slot', 2)
  //   ])
  // ];

  private recipes: Recipe[] = [];

  constructor(private shoopingService: ShoppingService) { }

  // Set Recipes fetching data from firebase V:281
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanaged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  // get Single Recipe for :id using children router
  getSingleRecipe(index: number)
  {
    return this.recipes[index];
    //return this.recipes.slice()[index];
  }

  addIngredientsToShoopingList(ingredients: Ingredient[]) {
      this.shoopingService.addIngredients(ingredients);
  }

  // New recipe create V:232
  addNewRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipeChanaged.next(this.recipes.slice());    // after created make new Copies using Subject .next()  V:232
  }

  // update Recipe V:232  recipe edit component
  updateRecipe(index: number, updatedRecipe: Recipe) {
    this.recipes[index] = updatedRecipe;
    this.recipeChanaged.next(this.recipes.slice());   // after updated make new Copies using Subject .next()  V:232
  }

  // delete Recipe
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanaged.next(this.recipes.slice());
  }

}
