import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResourceComponent} from './resource.component';
import {ResourceRoutingModule} from './resource-routing.module';



@NgModule({
  declarations: [
    ResourceComponent
  ],
  imports: [
    ResourceRoutingModule,
    CommonModule
  ]
})
export class ResourceModule { }
