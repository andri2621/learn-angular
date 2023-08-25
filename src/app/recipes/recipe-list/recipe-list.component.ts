import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'a test recipe',
      'this is a test recipe',
      'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg'
    ),
    new Recipe(
      'a test recipe',
      'this is a test recipe',
      'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg'
    ),
    new Recipe(
      'a test recipe',
      'this is a test recipe',
      'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg'
    ),
  ];

  constructor() {}

  ngOnInit() {}
}
