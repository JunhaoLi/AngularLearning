import { Effect, Actions } from '@ngrx/effects';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import * as RecipeActions from './recipe.actions';
import * as fromRecipes from './recipe.reducer';
import { Recipe } from '../recipe.model';

@Injectable()
export class RecipeEffects {

    @Effect()
    recipeFetch = this.actions$.ofType(RecipeActions.FETCH_RECIPES)
    .pipe(
        switchMap(
            (action: RecipeActions.FetchRecipes) =>
            this.httpClient.get<Recipe[]>('https://angularlearning-hans.firebaseio.com/recipe.json', { observe: 'body' })),
        map((recipes) => {
            for (let recipe of recipes) {
                if (!recipe['ingredients']) {
                    recipe['ingredients'] = [];
                }
            }
            return {
                type: RecipeActions.SET_RECIPES,
                payload: recipes
            };
        })
    );

    @Effect({dispatch: false})
    recipeStore = this.actions$.ofType(RecipeActions.STORE_RECIPES)
    .pipe(
        withLatestFrom(this.store.select('recipes')),
        switchMap(([action, state]) => {
            const req = new HttpRequest(
                'PUT',
                'https://angularlearning-hans.firebaseio.com/recipe.json',
                state.recipes,
                { reportProgress: true }
            );
            return this.httpClient.request(req);
        })
    );

    constructor(
        private store: Store<fromRecipes.FeatureState>,
        private actions$: Actions,
        private httpClient: HttpClient) {}
}
