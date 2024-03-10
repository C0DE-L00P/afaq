import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UsersService } from '../../../core/users.service';
import { FormsModule } from '@angular/forms';
import { ImgfallDirective } from '../../../core/imgfall.directive';

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
  imports: [CommonModule, FormsModule, ImgfallDirective],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  //TODO modal affairs

  isModalOpen = false;
  modalData: User = nullModal;
  modalState: 'preview' | 'add' | 'edit' = 'preview';

  users: User[] = [];
  options = {
    pageNumber: 1,
    pageSize: 10,
  };
  totalUsersCount = 18;
  pagesCount = 1;

  constructor(private usersService: UsersService) {
    this.usersService.getUsers(1, 10000).subscribe(
      (res) => {
        this.totalUsersCount = res.length;
      },
      (err) => console.error('TOTAL USER COUNT ERROR', err)
    );
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(page: number = 1, size: number = 10) {
    this.usersService.getUsers(page, size).subscribe(
      (res) => {
        this.users = res;
        this.pagesCount = Math.ceil(this.totalUsersCount / size);
      },
      (err) => console.error('ERR LOADING USERS', err)
    );
  }

  sortTable(factor: string) {
    this.users.sort((a:any, b:any) => {
      if (a[factor] < b[factor]) {
        return -1;
      }
      if (a[factor] > b[factor]) {
        return 1;
      }
      return 0;
    });
  }

  changePage(state: 'next' | 'prev') {
    this.options.pageNumber =
      this.options.pageNumber + (state == 'next' ? 1 : -1);
    this.loadUsers(this.options.pageNumber,this.options.pageSize);
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

  showModal(user: User | null, state: 'preview' | 'edit' | 'add') {
    this.modalData = user ?? nullModal;
    this.modalState = state;
    this.isModalOpen = true;
  }
}
