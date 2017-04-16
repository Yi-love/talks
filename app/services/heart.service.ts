import { Injectable } from '@angular/core';

import { Http , Response , Headers , RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { HttpService } from './http.service';

@Injectable()
export class HeartService extends HttpService {
  private getHeartUrl = '/api/heart/hearts';

  constructor(private http : Http ) {
    super();
  }

  getHearts():Promise<any>{
    return this.http.get(this.getHeartUrl)
                    .toPromise()
                    .then(this.getResponse)
  }
}