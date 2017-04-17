import { Component  , AfterViewChecked , ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import * as crypto from 'crypto';

import { LoginService } from '../services/login.service';
import { BaseComponent } from './base.component';
import { ErrorService } from '../services/error.service';

import { User } from '../models/user.model';

@Component({
  selector: 'login-app',
  templateUrl: 'template/login.html',
  styleUrls: ['css/login.css'],
})
export class LoginComponent extends BaseComponent implements AfterViewChecked {
  user:User = new User();
  valids = {'username':false , 'password':false};
  empty = {'username':true , 'password':true};
  isCanSubmit = false;
  isSignIn = false;
  error:any = '';
  errorHandler:any;

  loginUser:NgForm;
  @ViewChild('loginUser') currentForm:NgForm;

  constructor( private loginService : LoginService , 
               private router : Router ,
               errorService : ErrorService ){
    super(errorService);
  }

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
    this.getSecretKey().then(res=>{
      if( res.lsecret ) {
        let source = JSON.stringify(this.user);
        let lsecret = res.lsecret;
        let cipher = crypto.createCipher('aes-256-cbc' , lsecret);
        let cryped = cipher.update(source , 'utf8' , 'hex');
        cryped += cipher.final('hex');
        // console.log('data:' , cryped , lsecret);
        let userData = {'username':this.user['username'] , secret:cryped};
        return this.signIn(userData).then(result=>{
          if( result.isSignIn ) {
            this.isSignIn = true;
            return this.router.navigate(['/userIndex' , result.uid]);
          }else{
            this.isCanSubmit = false;
            return Promise.reject('login error');
          }
        }).catch(this.clearError.bind(this));
      }
      return Promise.reject('lsecret is gone');
    }).catch(this.clearError.bind(this));
  }

  signIn(data:any){
    return this.loginService.signIn(data);
  }

  getSecretKey(){
    return this.loginService.getSecretLoginKey();
  }

  
}