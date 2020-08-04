import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './list.component';
import {LoaderModule} from '../loader/loader.module';


@NgModule({
  declarations: [ListComponent],
  exports: [
    ListComponent
  ],
    imports: [
        CommonModule,
        LoaderModule
    ]
})
export class ListModule {
}
