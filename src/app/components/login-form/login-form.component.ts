import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styles: [
  ]
})

export class LoginFormComponent implements OnInit {

  loginForm!: FormGroup;
  submitted : boolean = false;
  errorMsg = '';

  constructor(private formBuilder:FormBuilder, private router:Router, private userService:UserService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      'email' : ['',[Validators.required,Validators.email]],
      'password' : ['',Validators.required]
    })
  }

  get f(){
    return this.loginForm.controls;
  }

  onLogin(){
    this.submitted = true;
    if(this.loginForm.valid){
      this.userService.getAllUsers().subscribe(resp=>{
        const user = resp.find((user:any)=>{
          return user.email === this.loginForm.value.email && user.password === this.loginForm.value.password;
        });
        if(user){
          this.userService.storeToken(user._id);
          this.router.navigate(['/dashboard']);
        }else{
          this.errorMsg = "Invalid Credential";
        }
      })
    }
  }

}
