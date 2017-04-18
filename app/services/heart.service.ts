import { Injectable } from '@angular/core';

import { Http , Response , Headers , RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { HttpService } from './http.service';
import { Heart } from '../models/heart.model';

@Injectable()
export class HeartService extends HttpService {
  private getHeartUrl = '/api/heart/hearts';

  constructor(private http : Http ) {
    super();
  }

  getHearts():Promise<Heart[]>{
    return this.http.get(this.getHeartUrl)
                    .toPromise()
                    .then(this.getResponse).then(result=>result=result['hearts'])
  }
}