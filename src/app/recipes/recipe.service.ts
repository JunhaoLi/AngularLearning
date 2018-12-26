import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";
import { RecipesComponent } from "./recipes.component";

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Tasty Schnitzel',
            'This is simply a test',
            'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
            [
                new Ingredient('Meet', 1),
                new Ingredient('French Fries', 20) 
            ]),
        new Recipe(
            'Big Fat Burger',
            'This is simply a test',
            'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meet', 1)
            ])
    ];

    constructor(private shopingListService: ShoppingListService) {}

    public setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    public getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

    public addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shopingListService.addIngredients(ingredients);
    }

    public getRecipe(index: number): Recipe {
        return this.recipes.slice()[index];
    }

    public addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    public updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    public deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}