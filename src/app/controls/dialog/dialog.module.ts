import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogComponent} from './dialog.component';
import {ModalModule} from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [DialogComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  exports: [
    DialogComponent
  ]
})
export class DialogModule {
}
