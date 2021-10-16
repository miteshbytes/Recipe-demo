import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth/services/auth.service';
import { clearAuthentication, isAuthenticated } from '../auth/auth/utility/authManager';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticate = false;  // varaible for checking If user Auth or not
  private userSub!: Subscription;

  @Output() selectedNavigate = new EventEmitter<string>();

  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private router: Router) { 
    this.isAuthenticate = isAuthenticated();
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticate = !!user;  // !user ? false : true
    });
  }

  onSelectNav(feature: string) {
    this.selectedNavigate.emit(feature);
  }

  // On click save data on Firebase database using DataStorageService V:280 
  onSaveData() {
    this.dataStorageService.storeRecipe();
  }

  // on click fetch recipe data from firebase
  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  // on click Logout remove token and redirect to auth
  onLogout() {
    clearAuthentication();
    this.isAuthenticate = false;
    this.router.navigate(['/auth']);
  }

  // unSubscribe subscription using OnDestory() V:299 
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
