import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';



@NgModule({
  declarations: [BreadCrumbComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    BreadCrumbComponent
  ]
})
export class SharedModule { }
