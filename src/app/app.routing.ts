import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { AuthRoutingModule } from "./auth/auth-routing.module";
import { HomeComponent } from "./home/home.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
    { path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule, AuthRoutingModule]
})
export class AppRoutingModule {}