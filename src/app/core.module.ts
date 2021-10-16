import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { TokenInterceptor } from "./auth/auth/utility/token.interceptor";
import { RecipeService } from "./recipes/services/recipe.service";


@NgModule({
    providers: [
        RecipeService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        }
    ]
})

export class CoreModule {}