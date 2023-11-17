import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { OddEvenComponent } from './odd-even/odd-even.component';
import { basicHighlightDirective } from './shared/basic-highlight.directive';
import { BetterHighlightDirective } from './shared/better-highlight.directive';
import { UnlessDirective } from './shared/unless.directive';
import { DropdownDirective } from './shared/dropdown.directive';
import { LoggingService } from './logging.service';
import { UsersComponent } from './users/users.component';
import { ActiveUserComponent } from './users/active-user/active-user.component';
import { InactiveUserComponent } from './users/inactive-user/inactive-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    OddEvenComponent,
    basicHighlightDirective,
    BetterHighlightDirective,
    UnlessDirective,
    DropdownDirective,
    UsersComponent,
    ActiveUserComponent,
    InactiveUserComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [LoggingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
