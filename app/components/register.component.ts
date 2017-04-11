import { Component , AfterViewChecked , ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import * as crypto from 'crypto';

import { RegisterService } from '../services/register.service';

import { RegisterUser } from '../models/register-user.module';

@Component({
  selector: 'register-app',
  templateUrl: 'template/register.html',
  styleUrls: ['css/register.css'],
})
export class RegisterComponent implements AfterViewChecked {
  user : RegisterUser = new RegisterUser();
  hasUser = false;
  isSave = false;
  isCanSubmit = false;
  error: any;
  valids = {'username':false , 'password':false , 'repassword':false};
  empty = {'username':true , 'password':true , 'repassword':true};
  vaildFiled = [ 'username' ,'password' , 'repassword' ];
  
  newUser:NgForm;
  @ViewChild('newUser') currentForm:NgForm;

  constructor( private registerService : RegisterService , 
               private router : Router ){}

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged(){
    if(this.currentForm === this.newUser ) {
      return;
    }
    this.newUser = this.currentForm;
    if ( this.newUser ){
      this.newUser.valueChanges
      .subscribe(data=>this.onValueChanged(data));
    }
  }
  onValueChanged(data?:any){
    if ( !this.newUser ){
      return;
    }
    let form = this.newUser.form;
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
          if ( filed === 'repassword' ){
            if( this.user['password'] !== this.user['repassword'] ) {
              this.valids[filed] = false;
            }else{
              this.valids[filed] = true;
            }
          }else{
            this.valids[filed] = true;
          }
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
    if( this.hasUser) {
      return this.isCanSubmit = false;
    }
    return this.isCanSubmit = true;
  }
  onRestHasUser(){
    this.hasUser = false;
  }
  onCheckUserName(){
    this.isHasUser().then(result=>{
      if( this.hasUser ) {
        this.isCanSubmit = false;
      }
    }).catch(error=>this.error=error);
  }
  onSubmit(){
    this.isHasUser().then(result=>{
      if( !this.hasUser ) {
        this.getSecretKey().then(res=>{
          if( res.rsecret ) {
            let source = JSON.stringify(this.user);
            let rsecret = res.rsecret;
            let cipher = crypto.createCipher('aes-256-cbc' , rsecret);
            let cryped = cipher.update(source , 'utf8' , 'hex');
            cryped += cipher.final('hex');
            // console.log('data:' , cryped , rsecret);
            let userData = {'username':this.user['username'] , secret:cryped};
            return this.signUp(userData).then(result=>{
              if( result ) {
                return this.router.navigate(['/']);
              }
            }).catch(error=>this.error=error);;
          }
          return Promise.reject('rsecret is gone');
        }).catch(error=>this.error=error);
      }else{
        this.isCanSubmit = false;
      }
    }).catch(error=>this.error=error);
  }
  isHasUser(){
    if( !this.user['username'] ) {
      return Promise.reject('username is undefined');
    }
    return this.registerService.isHasUserByuserName(this.user['username']).then(result=>this.hasUser=result['hasUser']);
  }
  signUp(data?:any){
    return this.registerService.signUp(data).then(result=>this.isSave=result['isSave']);
  }
  getSecretKey(){
    return this.registerService.getSecretRegisterKey();
  }
}