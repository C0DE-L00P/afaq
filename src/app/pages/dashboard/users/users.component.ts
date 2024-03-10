import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UsersService } from '../../../core/users.service';
import { FormsModule } from '@angular/forms';

const nullModal: User = {
  userType: 'System',
  url: '',
  clientId: '',
  id: 0,
  userName: '',
  name: '',
  email: '',
};

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  //TODO make columns sortable
  //TODO make placeholder when empty table

  isModalOpen = false;
  modalData: User = nullModal;
  modalState: 'preview' | 'add' | 'edit' = 'preview';

  users: User[] = [];
  options = {
    pageNumber: 1,
    pageSize: 10,
  };

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(
    page: number = 1,
    size: number = 10,
  ) {
    this.usersService.getUsers(page, size).subscribe(
      (res) => {
        this.users = res;
      },
      (err) => console.error('here', err)
    );
  }

  changePage(state: 'next' | 'prev') {
    //TODO if(this.options.pageNumber)

    let page = this.options.pageNumber + (state == 'next' ? 1 : -1);
    this.loadUsers(page);
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id).subscribe(
      (res) => {
        //TODO check if 200 OK or not
        this.loadUsers();
      },
      (err) => console.log(err)
    );
  }

  showModal(user: User|null, state: 'preview' | 'edit' | 'add') {
    this.modalData = user ?? nullModal;
    this.modalState = state;
    this.isModalOpen = true;
  }
}
