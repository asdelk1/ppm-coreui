import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogComponent} from './dialog.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {FormModule} from '../form/form.module';
import {InputFieldModule} from '../input-field/input-field.module';
import {ReferenceFieldModule} from '../reference-field/reference-field.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ClickOutsideModule} from '../../directives/click-outside/click-outside.module';


@NgModule({
  declarations: [DialogComponent],
    imports: [
        CommonModule,
        FormModule,
        ModalModule.forRoot(),
        InputFieldModule,
        ReferenceFieldModule,
        ReactiveFormsModule,
        ClickOutsideModule
    ],
  exports: [
    DialogComponent
  ]
})
export class DialogModule {
}
