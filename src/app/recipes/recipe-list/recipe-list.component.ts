import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  //@Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [];

  subscription!: Subscription;

  // recipes: Recipe[] = [
  //   new Recipe('Test Recipe title', 'test recipe description', 'https://www.uaex.edu/life-skills-wellness/food-nutrition/eating-well/EFNEP/images/Recipes-Banner.jpg'),
  //   new Recipe('Another Recipe title', 'another test recipe description', 'https://cookieandkate.com/images/2020/03/vegan-chana-masala-recipe-2-550x824.jpg')
  // ];
  
  constructor(private recipe: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Did Subscribe when latest data fetch Subject V:232
    this.subscription = this.recipe.recipeChanaged.subscribe(
      (recipes: Recipe[]) => {
          this.recipes = recipes;
      }
    );
    this.recipes = this.recipe.getRecipes();
  }

  // onSelectedRecipe(recipe: Recipe) {
  //   this.recipeWasSelected.emit(recipe);
  // }

  // New Recipe Button cliked
  onNewRecipe() {
      this.router.navigate(['new'], { relativeTo: this.route });  // children route call need to add relativeTo property.
  }

  // unsubscribe subscription after nginit seted value V:237
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
