import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  editMode: boolean = false;
  recipeForm!: FormGroup;

  constructor(private route: ActivatedRoute, private recipe: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
        this.id = +params['id']; // (+) converts string 'id' to a numbers
        this.editMode = params['id'] != null;

        console.log(this.editMode);

        this.initForm();   // calling initForm()
    });
  }

  private initForm() {

    let name              = '';
    let imagePath         = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipeData = this.recipe.getSingleRecipe(this.id);
      name             = recipeData.name;
      imagePath        = recipeData.imagePath;
      recipeDescription = recipeData.description;

      if (recipeData['ingredients']) {
          for (let ingredient of recipeData.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                'name' : new FormControl(ingredient.name, Validators.required),
                'amount' : new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
              })
            );
          }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });

  }

  // Did it for set FormArray value on html section  // this is solution V:335
  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  } 

  // Reactive form Submit
  onSubmit() {
    if (this.editMode) {
      this.recipe.updateRecipe(this.id, this.recipeForm.value);  // update recipe
    } else {
      this.recipe.addNewRecipe(this.recipeForm.value);  // new recipe  V:232
    }

    this.onCancel();  // calling cancel and redirect to '/'

  }

  // new Dynamic row add for ingredient
  addIngredient() {

    // casting formArray from form variable
      (<FormArray>this.recipeForm.get('ingredients')).push(
        new FormGroup({
          'name' : new FormControl('', Validators.required),
          'amount' : new FormControl('', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        })
      );
  }

  // On click Cancel and redirect (/)
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }


  // on Click delete ingredient X button  V:237
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
