import { Injectable } from '@angular/core';

import { Http , URLSearchParams ,RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { HttpService } from './http.service';

@Injectable()
export class ErrorService extends HttpService {
  private reportUrl = 'api/error/report';

  constructor(private http : Http ) {
    super();
  }

  sendReport(reason:any):void{
    let params = new URLSearchParams(`reason=${reason}`);
    let options = new RequestOptions({search:params});
    this.http.get(this.reportUrl , options)
                    .toPromise()
                    .then(this.getResponse)
                    .catch(this.handleError);
  }
}