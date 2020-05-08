import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReferenceFieldComponent} from './reference-field.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ClickOutsideModule} from '../../directives/click-outside/click-outside.module';


@NgModule({
  declarations: [
    ReferenceFieldComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClickOutsideModule
  ],
  exports: [
    ReferenceFieldComponent
  ]
})
export class ReferenceFieldModule {
}
