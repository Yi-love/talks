import { Component , OnInit } from '@angular/core';
import { ActivatedRoute , Params } from '@angular/router';
import { Location } from '@angular/common';

import { UserInfo } from '../models/user-info.model';
import { UserIndexService } from '../services/user-index.service';
import { BaseComponent } from './base.component';
import { ErrorService } from '../services/error.service';

@Component({
  selector: 'user-app',
  templateUrl: 'template/user.html',
  styleUrls: ['css/user.css'],
})
export class UserComponent extends BaseComponent implements OnInit {
  user : UserInfo = new UserInfo();
  errorHandler : any;
  error:string = '';
  constructor( private userIndexservice : UserIndexService ,
               private route : ActivatedRoute ,
               private location : Location ,
               errorService : ErrorService ){
    super(errorService);
  }
  ngOnInit():void{
    this.route.params
              .subscribe(params=>this.userIndexservice.getUserInfo(params['uid'])
              .then(result=>this.user=result['user'],this.clearError.bind(this)));
  }
  goBack(){
    this.location.back();
  }
}