import {NgModule} from '@angular/core';
import {LoaderComponent} from './loader.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LoaderInterceptor} from '../../interceptors/loader-interceptor.service';


@NgModule({
  declarations: [
    LoaderComponent
  ],
  exports: [
    LoaderComponent
  ]
})
export class LoaderModule {
}
