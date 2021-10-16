import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/services/recipe.service';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  token: string = '';

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  // Save Recipe on Firebase Database usig Recipe Service
  storeRecipe() {
      const recipes = this.recipeService.getRecipes();
      this.http.put('https://recipe-demo-f7230-default-rtdb.firebaseio.com/recipes.json', recipes)
        .subscribe(response => {
          console.log(response);
        });
  }

  // Retrieve Recipe on Firebase Database usig Recipe Service
  fetchRecipes() {
    
    return this.http.get<Recipe[]>('https://recipe-demo-f7230-default-rtdb.firebaseio.com/recipes.json')
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        })
      }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      )
      // .subscribe(recipes => {
      //   this.recipeService.setRecipes(recipes);
      // });
  }
}
