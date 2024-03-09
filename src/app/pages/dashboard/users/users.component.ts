import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  //TODO check if User type matches API
  //TODO make columns sortable
  //TODO make placeholder when empty table

  modalData: User = {
    img: '',
    id: 1,
    fullname: 'محمد جمال',
    username: 'mohamedgyaseen',
    email: 'mohamedgyaseen@gmail.com',
    password: '',
  };
  modalState: 'preview' | 'add' | 'edit' = 'preview';

  users: User[] = [
    {
      userType: 'System',
      url: '',
      clientId: '1',
      id: 1,
      userName: 'mohamedgyaseen',
      name: 'محمد جمال',
      email: 'mohamedgyaseen@gmail.com',
    },
  ];
}
