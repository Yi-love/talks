import { Injectable } from '@angular/core';

import { Http , Response , Headers , RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from '../models/user.model';

import { HttpService } from './http.service';

@Injectable()
export class LoginService extends HttpService {
  private signinUrl = '/api/signin';

  constructor(private http : Http ) {
    super();
  }

  signIn(user:User):Promise<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.signinUrl , {user} , options)
                    .toPromise()
                    .then(this.getResponse)
                    // .catch(this.handleError);
  }
}