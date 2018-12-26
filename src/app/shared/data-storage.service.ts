import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

import 'rxjs/Rx';

@Injectable()
export class DataStorageService {
    constructor(
        private http: Http,
        private recipeService: RecipeService) {}

    storeRecipe() {
        return this.http.put('https://angularlearning-hans.firebaseio.com/recipe.json', this.recipeService.getRecipes());
    }

    getRecipes() {
        return this.http.get('https://angularlearning-hans.firebaseio.com/recipe.json')
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