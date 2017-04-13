import { Component , OnInit } from '@angular/core';
import { ActivatedRoute , Params } from '@angular/router';

import { UserIndexService } from '../services/user-index.service';

import { UserInfo } from '../models/user-info.model';

@Component({
  selector: 'user-index-app',
  templateUrl: 'template/user-index.html',
  styleUrls: ['css/user-index.css'],
})
export class UserIndexComponent implements OnInit {
  user : any = {username:'',nickname:''};
  error: string = '';
  showMenu = false;
  errorHandler : any;
  constructor( private userIndexService : UserIndexService ,
               private route : ActivatedRoute ){}

  ngOnInit():void{
    this.route.params
              .subscribe(params=>this.userIndexService.getUserInfo(params['uid'])
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
  onSelectMenu(){
    this.showMenu = !this.showMenu;
  }
}