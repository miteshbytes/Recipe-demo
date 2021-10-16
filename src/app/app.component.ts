import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Recipe-course';

  currentNav = '';

  // Now it's will be working routing features for current active path so not used below fun.
  selectedNavigation(navPath: string) {
    this.currentNav = navPath;
  }
}
