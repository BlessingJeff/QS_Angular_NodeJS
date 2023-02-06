import { Component, OnInit } from '@angular/core';
import { userModel } from 'src/app/models/usermodel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})

export class HeaderComponent implements OnInit {

  user:userModel = {
    _id: '',
    name: '',
    email: '',
    password: '',
  }

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.canAccess();
    let token = sessionStorage.getItem('token');
    this.userService.getUserByToken(token).subscribe(resp=>{
      this.user=resp;
    })
  }

}
