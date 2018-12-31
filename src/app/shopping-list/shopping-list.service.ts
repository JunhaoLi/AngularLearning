import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {
    public ingredientsChanged = new Subject<Ingredient[]>();
    public startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    public getIngredient(index: number): Ingredient {
        return this.ingredients[index];
    }

    public addIngredients(ingredients: Ingredient[]) {
         this.ingredients.push(...ingredients);
         this.ingredientsChanged.next(this.ingredients.slice());
    }

    public updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    public deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}