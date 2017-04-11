import { Injectable } from '@angular/core';

import { Http , Response , Headers , RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { HttpService } from './http.service';

@Injectable()
export class LoginService extends HttpService {
  private signinUrl = '/api/signin';
  private getSecretLoginKeyUrl = '/api/signin/secretLoginKey';

  constructor(private http : Http ) {
    super();
  }

  signIn(data:any):Promise<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.signinUrl , {data} , options)
                    .toPromise()
                    .then(this.getResponse)
                    // .catch(this.handleError);
  }
  getSecretLoginKey():Promise<any>{
    return this.http.get(this.getSecretLoginKeyUrl)
                    .toPromise()
                    .then(this.getResponse)
  }
}