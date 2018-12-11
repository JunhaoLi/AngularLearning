import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

export class ShoppingListService {
    public ingredientsChanged = new Subject<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    public getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    public addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    public addIngredients(ingredients: Ingredient[]) {
         this.ingredients.push(...ingredients);
         this.ingredientsChanged.next(this.ingredients.slice());
    }
}