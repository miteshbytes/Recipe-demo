# RecipeCourse

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Note

Must have created project on firebase site and also have one created realtime database on it.

## Firebase Key

apiKey: 'AIzaSyCWACElCj9JstnMOaYrQ1rciIirk4tZF1w'
## Reference Url

Firebase API Reference : https://firebase.google.com/docs/reference/rest/auth#section-create-email-password

// Recipe : https://recipe-demo-f7230-default-rtdb.firebaseio.com/recipes.json  on Shared folder DataStorageService.

// {
//   "rules": {
//     ".read": "now < 1625250600000",  // 2021-7-3
//     ".write": "now < 1625250600000",  // 2021-7-3
//   }
// }


// {
//   "rules": {
//     ".read": "auth != null",  // 2021-10-15
//     ".write": "auth != null",  // 2021-10-15
//   }
// }
