import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../services/shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') ingredientFrom!: NgForm;  // for edit ingredient data V:220

  subscription!: Subscription;
  editedIndexNumber!: number;
  editMode: boolean = false;

  editedItem!: Ingredient;

  @ViewChild('nameInput', { static: true }) nameInput!: ElementRef;
  @ViewChild('amountInput', { static: true }) amountInput!: ElementRef;

  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private shoping: ShoppingService) { }

  ngOnInit(): void {

    // get selected Ingredient from Subject
    this.subscription = this.shoping.startedEditing
    .subscribe(
      (index: number) => {
        this.editedIndexNumber = index;
        this.editMode = true;
        
        this.editedItem = this.shoping.getIngredient(index);
        this.ingredientFrom.setValue({
          'nameInput' : this.editedItem.name,
          'amountInput' : this.editedItem.amount
        });

    });
  }

  // local User template reference variable // commented code Html before v:216

  // addButton() {
  //   const ingName       = this.nameInput.nativeElement.value;
  //   const ingAmount     = this.amountInput.nativeElement.value;
  //   const newIngredient = new Ingredient(ingName, ingAmount);

  //   this.ingredientAdded.emit(newIngredient);
 
  // }


  // Form Submit using Template driven form (Add/Update)
  
  onSubmitForm(form: NgForm) {

    const value = form.value;

    const newIngredient = new Ingredient(value.nameInput, value.amountInput);

    if (this.editedItem) {
      this.shoping.updateIngredient(this.editedIndexNumber, newIngredient);  // update Ingredient with check editMode V:221
    } else {
      this.ingredientAdded.emit(newIngredient);
    }

    this.editMode = false;
    form.reset();
  }

  // clear Form V:223
  onClear() {
    this.ingredientFrom.reset();
    this.editMode = false;
  }

  // delete ingredient V:224
  onDelete() {
    this.shoping.delete(this.editedIndexNumber);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
