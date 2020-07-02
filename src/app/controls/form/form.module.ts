import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormComponent} from './form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ReferenceFieldModule} from '../reference-field/reference-field.module';
import {InputFieldModule} from '../input-field/input-field.module';


@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReferenceFieldModule,
    InputFieldModule
  ],
  exports: [
    FormComponent
  ]
})
export class FormModule {
}
