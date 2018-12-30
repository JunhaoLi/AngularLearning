import { Action } from '@ngrx/store';
import { Ingredient } from '../shared/ingredient.model';

const ADD_INGREDIENT = "ADD_INGREDIENT";

const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ]
};

export function shoppingListReducer(state = initialState, action: Action) {
    switch(action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredient: [...state.ingredients]
            }
    }
    return state;
}