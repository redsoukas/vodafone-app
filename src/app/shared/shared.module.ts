import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [UserFormComponent, ConfirmDialogComponent],
  imports: [
    NgbModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    NgbModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ],
  entryComponents: [
    UserFormComponent,
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
