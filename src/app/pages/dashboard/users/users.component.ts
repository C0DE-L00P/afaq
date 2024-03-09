import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UsersService } from '../../../core/users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  //TODO make columns sortable
  //TODO make placeholder when empty table

  modalData: User = {
    userType: 'System',
    url: '',
    clientId: '1',
    id: 1,
    userName: 'mohamedgyaseen',
    name: 'محمد جمال',
    email: 'mohamedgyaseen@gmail.com',
  };
  modalState: 'preview' | 'add' | 'edit' = 'preview';

  users: User[] = [];
  
  constructor(private usersService: UsersService){}
    
  ngOnInit(){
    this.usersService.getUsers().subscribe(
      res=> {
       if(!res.success) throw res.message

       console.log('Data',res.data)
       this.users = res.data
      },
      err=> console.error('here',err)
    )
  }
}
