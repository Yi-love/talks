import { Component  , AfterViewChecked , ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../services/login.service';

import { User } from '../models/user.model';

@Component({
  selector: 'login-app',
  templateUrl: 'template/login.html',
  styleUrls: ['css/login.css'],
})
export class LoginComponent implements AfterViewChecked {
  user:User = new User();
  valids = {'username':false , 'password':false};
  empty = {'username':true , 'password':true};
  isCanSubmit = false;
  isSignIn = false;
  error:any;

  loginUser:NgForm;
  @ViewChild('loginUser') currentForm:NgForm;

  constructor( private loginService : LoginService , 
               private router : Router ){}

  ngAfterViewChecked() {
    this.formChanged();
  }

    formChanged(){
    if(this.currentForm === this.loginUser ) {
      return;
    }
    this.loginUser = this.currentForm;
    if ( this.loginUser ){
      this.loginUser.valueChanges
      .subscribe(data=>this.onValueChanged(data));
    }
  }
  onValueChanged(data?:any){
    if ( !this.loginUser ){
      return;
    }
    let form = this.loginUser.form;
    for ( let filed in this.valids ) {
      let control = form.get(filed);
      if( control && control.dirty ) {
        if( !control.valid ) {
          this.valids[filed] = false;
          if( this.user[filed] === '' ) {
            this.empty[filed] = true;
          }else{
            this.empty[filed] = false;
          }
        }else{
          this.valids[filed] = true;
          this.empty[filed] = false;
        }
      }
    };

    for ( let filed in this.valids ) {
      if( !this.valids[filed] ) {
        return this.isCanSubmit = false;
      }
    }
    for ( let filed in this.empty ) {
      if( this.empty[filed] ) {
        return this.isCanSubmit = false;
      }
    }
    return this.isCanSubmit = true;
  }

  onSubmit(){
    this.signIn().then(result=>{
      if( !this.isSignIn ) {
        return this.router.navigate(['/']);
      }else{
        this.isCanSubmit = false;
      }
    }).catch(error=>this.error=error);
  }

  signIn(){
    return this.loginService.signIn(this.user);
  }
}