import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ShoppingListComponent } from "./shopping-list.component";

const shoppingListRouting: Routes = [
    { path: 'shopping-list', component: ShoppingListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(shoppingListRouting)],
    exports: [RouterModule]
})
export class ShoppingListRoutingModule {}