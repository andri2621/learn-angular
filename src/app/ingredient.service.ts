import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from './shared/ingredient.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5, 'sold'),
    new Ingredient('Tomatoes', 5, 'available'),
    new Ingredient('Chili', 5, 'sold'),
  ];

  statusUpdated = new EventEmitter<string>();

  constructor(private loggingService: LoggingService) {}

  add(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.loggingService.logStatusChange(ingredient);
  }

  updateStatus(id: number, status: string) {
    this.ingredients[id].status = status;
    this.loggingService.logStatusChange(status);
  }
}
