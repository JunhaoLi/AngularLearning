import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataStorageService } from '../../shared/data-storage.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from 'src/app/store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as fromAuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  authState: Observable<fromAuth.State>;

  constructor(
    private router: Router,
    private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.dataStorageService.storeRecipe().subscribe(() => {});
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.store.dispatch(new fromAuthActions.Logout());
  }

  isAuthenticated() {
    this.store.dispatch(new fromAuthActions.Logout());
  }
}
