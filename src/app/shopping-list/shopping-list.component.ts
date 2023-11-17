import { Component, OnInit, HostListener, Input } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { LoggingService } from '../logging.service';
import { IngredientService } from '../ingredient.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  providers: [IngredientService],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];
  selectedItem: any;

  constructor(
    private loggingService: LoggingService,
    private ingredientService: IngredientService
  ) {}

  // TO MAKE CLEAR THE SELECTED ITEM WHEN CLICK OUTSIDE
  ngOnInit() {
    // Add a click event listener to the document using an arrow function
    document.addEventListener('click', (event) => this.onDocumentClick(event));
    // provide ingredients data with services
    this.ingredients = this.ingredientService.ingredients;
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
    // this.ingredients.push(ingredient);
    //! add data ingredient with services
    this.ingredientService.add(ingredient);
  }

  onIngredientClear() {
    this.ingredients = [];
  }

  onClickItem(ingredient: Ingredient) {
    this.selectedItem = ingredient; // Set the clicked ingredient
    this.loggingService.logStatusChange(ingredient); // use logging service
  }

  onUpdateStatus(id: number, status: string) {
    this.ingredientService.statusUpdated.emit(status); // emit the status
    this.ingredientService.updateStatus(id, status);
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
