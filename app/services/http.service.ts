import { Response } from '@angular/http';

export class HttpService {
  constructor(){}

  getResponse( res:Response | any ){
    let result = res.json();
    if( +result.code !== 0 ) {
      return Promise.reject(result.message);
    }
    return Promise.resolve(result.data);
  }
  handleError(error: Response | any){
    let errMsg: string;
     if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Promise.reject(errMsg);
  }
}