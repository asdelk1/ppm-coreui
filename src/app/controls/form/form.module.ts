import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormComponent} from './form.component';
import {InputFieldModule} from '../input-field/input-field.module';


@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    InputFieldModule
  ],
  exports: [
    FormComponent
  ]
})
export class FormModule {
}
