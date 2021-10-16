import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { AuthComponent } from './auth/auth/auth.component';
// import { AuthGuard } from './auth/auth/utility/auth.guard';
// import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
// import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
// import { RecipeResolverResolver } from './recipes/recipe-resolver.resolver';
// import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
// import { RecipesComponent } from './recipes/recipes.component';
//import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  { path: '',   redirectTo: '/recipes', pathMatch: 'full' }, // redirect to `first-component`
  // { path: 'recipes', component: RecipesComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     { path: '', component: RecipeStartComponent },
  //     { path: 'new', component: RecipeEditComponent },  // RecipeEditComponent static parm shold be up  : 164V
  //     { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverResolver] }, // Add RecipeResolverResolver V:283
  //     { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverResolver] }, // RecipeEditComponent dynamic parameter compo. shold be down
  //   ]
  // },
  // { path: 'shopping-list', component: ShoppingListComponent },
  // { path: 'auth', component: AuthComponent}

  { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)}, // make Lazy Loading
  { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
