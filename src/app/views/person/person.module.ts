import {NgModule} from '@angular/core';
import {PersonComponent} from './person.component';
import {PersonRoutingModule} from './person-routing.module';
import {FormModule} from '../../controls/form/form.module';
import {ListModule} from '../../controls/list/list.module';
import {DialogModule} from '../../controls/dialog/dialog.module';

@NgModule({
  declarations: [
    PersonComponent
  ],
  imports: [
    PersonRoutingModule,
    FormModule,
    ListModule,
    DialogModule
  ]
})
export class PersonModule {
}
