import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  // @Input()
  // recipe!: Recipe;

  recipe!: Recipe;  // Using Children Router :id

  id: number = 0;

  constructor(private recipeService : RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Get parameter from URL :id
    this.route.params.subscribe( (params: Params) => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      this.recipe = this.recipeService.getSingleRecipe(this.id);
   });
  }


  // Add ingredients to Shooping Lists
  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoopingList(this.recipe.ingredients);
  }


  // On click Edit Recipe button
  onEditRecipe() {
      this.router.navigate(['edit'], { relativeTo: this.route });  // No Write :id it's automatically work this.route

      //this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route} );  // alternative
  }

  // On click delete Recipe V:233
  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
