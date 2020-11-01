import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { User, UserVM } from 'src/app/core/services/users/users.model';
import { UsersService } from 'src/app/core/services/users/users.service';
import { UserFormComponent } from 'src/app/shared/components/user-form/user-form.component';
import { Subscriptions } from 'src/app/shared/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  page = 1;
  pageSize = 4;
  subs: Subscriptions = {};
  users: Array<User> = [];
  closeResult = '';
  constructor(
    private usersService: UsersService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.fetchUsers();
  }

  open(user, type = 'edit') {
    const modalRef = this.modalService.open(UserFormComponent, {ariaLabelledBy: 'modal-basic-title'});
    modalRef.componentInstance.user = user;
    this.subs.submitValueSub = modalRef.componentInstance.userFormValues.subscribe( (userBody: User) => {
      if ( type === 'create') {
        this.createUser(userBody);
      } else {
        this.updateUser(user.id, userBody);
      }
      this.modalService.dismissAll();
    });

    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  fetchUsers(): void {
    this.subs.usersSub = this.usersService.getUsers()
    .subscribe( (res: Array<User>) => {
      if (res && res.length) {
        this.users = res.map( (userObj: User) => new UserVM(userObj));
      }
    });
  }

  createUser(body): void {
    this.subs.createUserSub = this.usersService.createUser(body)
    .subscribe( res => {
      const createdUser = new UserVM(res);
      this.appendUserList(createdUser);
    });
  }

  updateUser(id: number, body: User): void {
    this.subs.updateUserSub = this.usersService.updateUser(id, body)
    .subscribe( res => {
      const updatedUser = new UserVM(res);
      this.updateUserList(updatedUser);
    });
  }

  deleteUser(id: number): void {
    this.subs.deleteUserSub = this.usersService.deleteUser(id)
    .subscribe( res => {
      if (res === 200) {
        this.users = this.users.filter( user => user.id !== id);
      }
    });
  }

  handlePageChange(pageNumber): void {
    this.page = pageNumber;
  }

  // typicode api does not persist changes thus manipulating view directly to be able to see updated user in view
  updateUserList(updatedUser: User): void {
    const userToUpdate = this.users.filter( (user) => user.id === updatedUser.id)[0];
    const keyToUpdate = this.users.indexOf(userToUpdate);
    if (keyToUpdate !== -1) {
      this.users[keyToUpdate] = updatedUser;
    }
  }

  // typicode api does not persist changes thus manipulating view directly to be able to see new user in view
  appendUserList(user: User): void {
    this.users = [
      ...this.users,
      user
    ];
  }

  ngOnDestroy(): void {
    Object.keys(this.subs).forEach(sub => this.subs[sub].unsubscribe());
  }

}
