import { Injectable } from '@angular/core';

import { Http , Response , Headers , RequestOptions ,URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { HttpService } from './http.service';
import { UserInfo } from '../models/user-info.model';

@Injectable()
export class UserIndexService extends HttpService {
  private getUserInfoUrl = '/api/getUserInfo';

  constructor(private http : Http ) {
    super();
  }

  getUserInfo(uid:string):Promise<UserInfo>{
    let params = new URLSearchParams(`uid=${uid}`);
    let options = new RequestOptions({search:params});
    return this.http.get(this.getUserInfoUrl ,options)
                    .toPromise()
                    .then(this.getResponse).then(result=>result=result['user']);
  }
}