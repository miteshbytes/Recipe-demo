import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { CoreModule } from "src/app/core.module";
import { LoadingSpinnerComponent } from "src/app/shared/loading-spinner/loading-spinner.component";
import { AuthComponent } from "./auth.component";

@NgModule({
    declarations: [
        AuthComponent,
        LoadingSpinnerComponent  // If depedancy in authModule then declare here instead of AppModule.ts file
    ],
    imports: [
        CoreModule,
        BrowserModule,
        FormsModule,
        RouterModule.forChild([{ path: 'auth', component: AuthComponent }]) 
        
        // If you don't create auth-routing.module.ts file then can do like these in forChild() for declare router
    ]
})

export class AuthModule {}
