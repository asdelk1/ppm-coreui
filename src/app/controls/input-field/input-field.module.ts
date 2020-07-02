import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {InputFieldComponent} from './input-field.component';



@NgModule({
  declarations: [
    InputFieldComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    InputFieldComponent
  ]
})
export class InputFieldModule { }
