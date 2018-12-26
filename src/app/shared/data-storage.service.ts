import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

import 'rxjs/Rx';
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService {
    constructor(
        private http: Http,
        private recipeService: RecipeService,
        private authService: AuthService) {}

    storeRecipe() {
        let tk = this.authService.getToken();
        return this.http.put('https://angularlearning-hans.firebaseio.com/recipe.json?auth=' + tk, this.recipeService.getRecipes());
    }

    getRecipes() {
        let tk = this.authService.getToken();

        return this.http.get('https://angularlearning-hans.firebaseio.com/recipe.json?auth=' + tk)
        .map((response: Response) => {
            const recipes = response.json();
            for (let recipe of recipes) {
                if (!recipe['ingredients']) {
                    recipe['ingredients'] = [];
                }
            }
            return recipes;
        })
        .subscribe((response: Recipe[]) => {
            this.recipeService.setRecipes(response);
        });
    }
}