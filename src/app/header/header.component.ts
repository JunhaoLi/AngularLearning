import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Response } from '@angular/http';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private dataStorageService: DataStorageService,
    private authService: AuthService) {}

  onSaveData() {
    this.dataStorageService.storeRecipe().subscribe((response: Response) => {
      console.log(response);
    });
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
