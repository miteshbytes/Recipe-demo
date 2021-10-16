import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  //providers: [RecipeService]  // move to app.module.ts file  V:237
})
export class RecipesComponent implements OnInit {

  selectedRecipe!: Recipe;

  constructor(private recipe: RecipeService) { }

  ngOnInit(): void {
    this.recipe.recipeSelected.subscribe((recipe: Recipe) => {
        this.selectedRecipe = recipe;
    });
  }

}
