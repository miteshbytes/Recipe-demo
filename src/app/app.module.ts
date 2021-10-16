import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
// import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
// import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
// import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
// import { ShoppingListComponent } from './shopping-list/shopping-list.component';
// import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
//import { RecipesComponent } from './recipes/recipes.component';
// import { DropdownDirective } from './directives/dropdown.directive';
// import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
// import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { RecipeService } from './recipes/services/recipe.service';
import { AuthComponent } from './auth/auth/auth.component';
// import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
//import { TokenInterceptor } from './auth/auth/utility/token.interceptor';
// import { RecipesModule } from './recipes/recipes.module';
// import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // RecipeListComponent,
    // RecipeDetailComponent,
    // RecipeItemComponent,
    // ShoppingListComponent,
    // ShoppingEditComponent,
    // RecipesComponent,
    // DropdownDirective,
    // RecipeStartComponent,
    // RecipeEditComponent,
    // AuthComponent,
    // LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // FormsModule,
    //ReactiveFormsModule,
    HttpClientModule,
    // RecipesModule,  // make Lazy loading so import in app-routing.module.ts file   (here loaded Module is called Eager Loading)
    // ShoppingListModule,
    CoreModule,
    AuthModule
  ],
  // providers: [
  //   RecipeService,
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: TokenInterceptor,
  //     multi: true
  //   }
  // ],

  // Make CoreModule and set provider:[] instead of AppModule for will be code clearful app module V: 327
  bootstrap: [AppComponent]
})
export class AppModule { }
