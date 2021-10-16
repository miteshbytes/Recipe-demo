import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth/utility/auth.guard';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeResolverResolver } from './recipe-resolver.resolver';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes.component';

const routes: Routes = [
  { path: '', component: RecipesComponent,  // remove 'recipes' from here for become lazy loading module
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },  // RecipeEditComponent static parm shold be up  : 164V
      { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverResolver] }, // Add RecipeResolverResolver V:283
      { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverResolver] }, // RecipeEditComponent dynamic parameter compo. shold be down
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
