import { Component  , AfterViewChecked , ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import * as crypto from 'crypto';//加密模块 , 需npm install --save-dev @types/node

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
  error: string = '';
  loginUser:NgForm;
  @ViewChild('loginUser') currentForm:NgForm;//备份，好进行比较

  constructor( private loginService : LoginService , 
               private router : Router ){
  }
  /**
   * [ngAfterViewChecked 会在页面改变的时候触发]
   */
  ngAfterViewChecked() {
    this.formChanged();//进行表单校验
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
  /**
   * [onValueChanged 自己进行数据校验，可自己定义校验指令。这里使用的是默认的校验指令]
   * @param {any} data [description]
   */
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
  /**
   * [onSubmit 提交数据]
   */
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
        }).catch(error=>this.error=error);
      }
      return Promise.reject('lsecret is gone');
    }).catch(error=>this.error=error);
  }

  signIn(data:any){
    return this.loginService.signIn(data);
  }

  getSecretKey(){
    return this.loginService.getSecretLoginKey();
  }

  
}