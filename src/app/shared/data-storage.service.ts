import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest } from "@angular/common/http";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

import 'rxjs/Rx';

@Injectable()
export class DataStorageService {
    constructor(
        private httpClient: HttpClient,
        private recipeService: RecipeService) {}

    storeRecipe() {
        const req = new HttpRequest(
            'PUT',
            'https://angularlearning-hans.firebaseio.com/recipe.json',
            this.recipeService.getRecipes(),
            {
                reportProgress: true
            }
        );

        return this.httpClient.request(req);
    }

    getRecipes() {
        return this.httpClient
        .get<Recipe[]>(
            'https://angularlearning-hans.firebaseio.com/recipe.json', 
            {
                observe: 'body'
            }
        )
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