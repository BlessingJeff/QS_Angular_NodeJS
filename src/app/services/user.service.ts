import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { userModel } from '../models/usermodel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private router:Router) { }

  isLoggedin():boolean{
    if(sessionStorage.getItem('token')!==null){
      return true;
    }
    return false;
  }

  canAccess(){
    if(!this.isLoggedin()){
      this.router.navigate(['/']);
    }
  }

  storeToken(token:any){
    sessionStorage.setItem('token',token);
  }

  getAllUsers():Observable<userModel[]>{
    return this.http.get<userModel[]>("users");
  }

  getUserByToken(token:any):Observable<userModel>{
    return this.http.get<userModel>('getuserbytoken'+'/'+token);
  }

}
