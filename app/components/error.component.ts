import { Component , Input , Output ,SimpleChange ,EventEmitter } from '@angular/core';
import { ErrorService } from '../services/error.service';

@Component({
  selector: 'error-app',
  templateUrl: 'template/error.html',
  styleUrls:['css/error.css']
})
export class ErrorComponent{
  @Input() error: string;
  @Input() timeout: any = true;
  @Output() clearError = new EventEmitter<any>();
  errorHandler: any;
  constructor(private errorService : ErrorService){
  }
  /**
   * [ngOnChanges 有数据变化的时候会调用，ng开头的是ng内部生命钩子事件]
   * @param {SimpleChange} changes [内部类]
   */
  ngOnChanges(changes:SimpleChange){
    console.log(changes['error']);
    if ( changes['error'] && changes['error'].currentValue !== '' ) {
      this.showError(changes['error'].currentValue);
    }
  }
  /**
   * [showError 展示错误提示 ， 默认4秒后会关闭错误， 通过@output传递给父亲组件]
   * @param {string} error [description]
   */
  showError(error: string){
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