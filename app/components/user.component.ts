import { Component , OnInit } from '@angular/core';
import { ActivatedRoute , Params } from '@angular/router';
import { Location } from '@angular/common';

import { UserInfo } from '../models/user-info.model';
import { UserIndexService } from '../services/user-index.service';

@Component({
  selector: 'user-app',
  templateUrl: 'template/user.html',
  styleUrls: ['css/user.css'],
})
export class UserComponent {
  user : UserInfo = new UserInfo();
  errorHandler : any;
  error:string = '';
  constructor( private userIndexservice : UserIndexService ,
               private route : ActivatedRoute ,
               private location : Location ){}

  ngOnInit():void{
    this.route.params
              .subscribe(params=>this.userIndexservice.getUserInfo(params['uid'])
              .then(result=>this.user=result['user'],this.clearError.bind(this)));
  }

  clearError(error:any){
    console.log('error:' , error);
    clearTimeout(this.errorHandler);
    this.error = error;
    this.errorHandler = setTimeout(()=>{
      this.error = '';
    } , 4000);
  }

  goBack(){
    this.location.back();
  }
}