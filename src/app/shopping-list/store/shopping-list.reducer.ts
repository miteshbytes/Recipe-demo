import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";
import  * as ShoopingListActions  from "./shopping-list.actions";


export interface ShoppingListState{
    ingredients: Ingredient[];
}

const initialState = {
    ingredients: [
        new Ingredient('Apple', 5),
        new Ingredient('Banana', 10),
    ]
};

//export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export function shoppingListReducer(state = initialState, action: ShoopingListActions.AddIngredient) {
    switch (action.type) {
    case ShoopingListActions.ADD_INGREDIENT:
        return [...state.ingredients, action.payload];
    default:
        return state;
    }
}