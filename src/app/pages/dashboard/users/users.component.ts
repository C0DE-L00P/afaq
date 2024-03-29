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
  password: '',
};
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const usernamePattern = /^[^\s@]+$/;

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ImgfallDirective],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  isLoading = false;
  isModalOpen = false;
  modalFormErrors = {
    fill: false,
    passLength: false,
    usernameReg: false,
    emailReg: false,
    formValid: true,
  };

  validate() {
    this.modalFormErrors.fill =
      this.modalData.email == '' ||
      this.modalData.password == '' ||
      this.modalData.userName == '' ||
      this.modalData.name == '';
    this.modalFormErrors.passLength =
      !this.modalData.password || this.modalData.password.length < 8;
    this.modalFormErrors.emailReg = !emailPattern.test(this.modalData.email);
    this.modalFormErrors.usernameReg = !usernamePattern.test(
      this.modalData.userName
    );

    this.modalFormErrors.formValid =
      !this.modalFormErrors.passLength &&
      !this.modalFormErrors.fill &&
      !this.modalFormErrors.emailReg &&
      !this.modalFormErrors.usernameReg;
  }
  modalData: any = nullModal;
  modalState: 'preview' | 'add' | 'edit' = 'preview';

  addUser() {
    this.usersService
      .addUser(
        this.modalData.userName,
        this.modalData.name,
        this.modalData.email,
        this.modalData.password,
        this.modalData.file
      )
      .subscribe(
        (res) => {
          this.isModalOpen = false;
          this.loadUsers(this.options.pageNumber, this.options.pageSize);
        },
        (err) => console.error(err)
      );
  }

  editUser() {
    this.usersService
      .updateUser(
        this.modalData.id,
        this.modalData.name,
        this.modalData.email,
        this.modalData.userName,
        this.modalData.password,
        this.modalData.file
      )
      .subscribe(
        (res: any) => {
          this.isModalOpen = false;
        },
        (err: any) => console.error(err)
      );
  }

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
    this.users.sort((a: any, b: any) => {
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
    this.loadUsers(this.options.pageNumber, this.options.pageSize);
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id).subscribe(
      (res) => {
        this.loadUsers();
      },
      (err) => console.log(err)
    );
  }

  showModal(user: User | null, state: 'preview' | 'edit' | 'add') {
    this.modalData = user ?? nullModal;
    this.modalState = state;
    this.isModalOpen = true;
    
    if (state != 'add')
      this.usersService.getUser(this.modalData.id).subscribe(
        (res) => {
          this.modalData.password = res.password;
        },
        (err) => console.error(err)
      );
  }

  imageSrc: string | ArrayBuffer | null = null;
  readURL(event: any): void {
    if (event.target)
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        this.modalData.file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = (e) => (this.imageSrc = reader.result);

        reader.readAsDataURL(file);
      }
  }
}
