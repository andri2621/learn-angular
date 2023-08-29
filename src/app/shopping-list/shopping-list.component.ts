import { Component, OnInit, HostListener } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 5),
  ];
  selectedItem: any;

  constructor() {}

  // TO MAKE CLEAR THE SELECTED ITEM WHEN CLICK OUTSIDE
  ngOnInit() {
    // Add a click event listener to the document using an arrow function
    document.addEventListener('click', (event) => this.onDocumentClick(event));
  }

  ngOnDestroy() {
    // Remove the event listener when the component is destroyed
    document.removeEventListener('click', this.onDocumentClick);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    // Check if the clicked element is not within the list
    if (!this.isElementInList(event.target as HTMLElement)) {
      this.selectedItem = null; // Set selectedItem to null
    }
  }

  // Helper function to check if the clicked element is within the list
  private isElementInList(element: HTMLElement): boolean {
    const list = document.querySelector('.list-group');
    return list?.contains(element) || false;
  }
  // ========================================================

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  onIngredientClear() {
    this.ingredients = [];
  }

  onClickItem(ingredient: Ingredient) {
    this.selectedItem = ingredient; // Set the clicked ingredient
  }

  onIngredientDelete() {
    if (this.selectedItem) {
      const index = this.ingredients.indexOf(this.selectedItem);

      //only delete item when data is exist
      if (index !== -1) {
        // Remove the selected ingredient from the array
        this.ingredients.splice(index, 1);
        this.selectedItem = null; // Reset selectedItem to null
      }
    }
  }
}
