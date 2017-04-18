import { Component , Input , Output ,SimpleChange ,EventEmitter } from '@angular/core';
import { ErrorService } from '../services/error.service';

@Component({
  selector: 'error-app',
  templateUrl: 'template/error.html',
  styleUrls:['css/error.css']
})
export class ErrorComponent{
  @Input() error: any;
  @Input() timeout: any = true;
  @Output() clearError = new EventEmitter<any>();
  errorHandler: any;
  constructor(private errorService : ErrorService){
  }
  ngOnChanges(changes:SimpleChange){
    console.log(changes['error']);
    if ( changes['error'] && changes['error'].currentValue !== '' ) {
      this.showError(changes['error'].currentValue);
    }
  }
  showError(error:any){
    clearTimeout(this.errorHandler);
    this.error = error;
    this.errorService.sendReport(encodeURIComponent(error));
    if ( this.timeout ){
      this.errorHandler = setTimeout(()=>{
        this.error = '';
        this.clearError.emit('');
      } , typeof this.timeout === 'number' ? this.timeout*1000 : 4000);
    }
  }
}