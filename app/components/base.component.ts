import { ErrorService } from '../services/error.service';

export class BaseComponent{
  error: any = '';
  errorHandler:any;
  constructor(protected errorService : ErrorService){}

  clearError(error:any){
    clearTimeout(this.errorHandler);
    this.error = error;
    this.errorService.sendReport(encodeURIComponent(error));
    this.errorHandler = setTimeout(()=>{
      this.error = '';
    } , 4000);
  }
}