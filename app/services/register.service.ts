import { Injectable } from '@angular/core';

import { Http , Response , Headers , RequestOptions , URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { HttpService } from './http.service';

@Injectable()
export class RegisterService extends HttpService {
  private checkUserByuserNameUrl = '/api/register/checkUserByuserName';
  private signupUrl = '/api/signup';
  private getSecretRegisterKeyUrl = '/api/register/secretRegisterKey';

  constructor(private http : Http ) {
    super();
  }

  isHasUserByuserName(username:string):Promise<any>{
    let params = new URLSearchParams(`username=${username}`);
    let options = new RequestOptions({search:params});
    return this.http.get(this.checkUserByuserNameUrl , options)
                    .toPromise()
                    .then(this.getResponse)
                    // .catch(this.handleError);
  }
  signUp(data:any):Promise<any>{
    if( !data ) {
      return Promise.reject('no user');
    }
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.signupUrl , {data} , options)
                    .toPromise()
                    .then(this.getResponse)
                    // .catch(this.handleError);
  }
  getSecretRegisterKey():Promise<any>{
    return this.http.get(this.getSecretRegisterKeyUrl)
                    .toPromise()
                    .then(this.getResponse)
  }
}