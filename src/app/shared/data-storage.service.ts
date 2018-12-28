import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";

import 'rxjs/Rx';

@Injectable()
export class DataStorageService {
    constructor(
        private httpClient: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) {}

    storeRecipe() {
        let tk = this.authService.getToken();
        return this.httpClient.put('https://angularlearning-hans.firebaseio.com/recipe.json?auth=' + tk, this.recipeService.getRecipes());
    }

    getRecipes() {
        let tk = this.authService.getToken();
        return this.httpClient.get<Recipe[]>('https://angularlearning-hans.firebaseio.com/recipe.json?auth=' + tk)
        .map((recipes) => {
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