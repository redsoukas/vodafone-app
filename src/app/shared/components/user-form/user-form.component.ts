import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/core/services/users/users.model';
import { Subscriptions } from '../../models';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  user: User;
  userForm: FormGroup;
  subs: Subscriptions;
  @Output() userFormValues: EventEmitter<User> = new EventEmitter<User>();
  constructor(
    public modal: NgbModal,
  ) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl(this.user && this.user.name || ''),
      username: new FormControl(this.user && this.user.username || ''),
      email: new FormControl(this.user && this.user.email || ''),
    });
  }

  handleSubmit() {
    this.userFormValues.emit(this.userForm.value);
  }

  handleCancel() {
    // form is dirty
    if (!this.userForm.pristine) {
      const dialogRef = this.modal.open(ConfirmDialogComponent);
      dialogRef.componentInstance.title = 'User Form';
      dialogRef.componentInstance.message = 'Are you sure you want to cancel without save? You will lose your changes.';
      dialogRef.result
      .then( (result) => {
        if (result === 'ok') {
          this.modal.dismissAll('cancel click');
        }
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      this.modal.dismissAll('cancel click');
    }
  }

}
