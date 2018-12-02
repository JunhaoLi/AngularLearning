import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from "@angular/core";

export class ShoppingListService {
    public ingredientsChanged: EventEmitter<Ingredient[]> = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    public getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    public addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

    public addIngredients(ingredients: Ingredient[]) {
         this.ingredients.push(...ingredients);
         this.ingredientsChanged.emit(this.ingredients.slice());
    }
}