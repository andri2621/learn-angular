import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  Input,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { IngredientService } from 'src/app/ingredient.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit {
  //! using inputRef
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;

  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @Output() ingredientDelete = new EventEmitter<Ingredient>();
  @Output() ingredientClear = new EventEmitter<Ingredient>();
  @Input('selected') selectedList: any;
  @Input('items') itemList: any[];

  constructor(private ingredientService: IngredientService) {
    this.ingredientService.statusUpdated.subscribe((status: string) =>
      alert('new status: ' + status)
    );
  }

  ngOnInit(): void {}

  //! using inputRef
  // onAddItem(inputRef: HTMLInputElement) {
  //   const ingName = this.nameInputRef.nativeElement.value;
  //   const ingAmount = this.amountInputRef.nativeElement.value;
  //   const newIngredient = new Ingredient(ingName, ingAmount);
  //   this.ingredientAdded.emit(newIngredient);
  //   this.nameInputRef.nativeElement.value = '';
  //   this.amountInputRef.nativeElement.value = '';
  // }

  //! using form module 'ngForm'
  onAddItem(form: NgForm) {
    const ingName = form?.value?.itemName;
    const ingAmount = form?.value?.itemAmount;
    const status = 'available';

    const newIngredient = new Ingredient(ingName, ingAmount, status);
    this.ingredientAdded.emit(newIngredient);
    form.resetForm(); //* Reset the form after successful submission
  }

  onClearItem() {
    this.ingredientClear.emit();
  }

  onDeleteItem() {
    this.ingredientDelete.emit();
  }
}
