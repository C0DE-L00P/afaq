import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UsersService } from '../../../core/users.service';
import { FormsModule } from '@angular/forms';

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
  options = {
    pageNumber: 1,
    pageSize: 10
  }
  
  constructor(private usersService: UsersService){}
    
  ngOnInit(){
    this.usersService.getUsers(this.options.pageNumber,this.options.pageSize)
    .subscribe(
      res=> {
       this.users = res
      },
      err=> console.error('here',err)
    )
  }

  changePage(state: 'next'|'prev'){
    //TODO if(this.options.pageNumber)

    let page = this.options.pageNumber + (state=='next'? 1:-1)

    this.usersService.getUsers(page,this.options.pageSize)
    .subscribe(
      res=> {
       this.users = res
      },
      err=> console.error('here',err)
    )
  }
}
