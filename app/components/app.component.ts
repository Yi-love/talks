import { Component } from '@angular/core';

import { BaseComponent } from './base.component';
import { ErrorService } from '../services/error.service';

@Component({
  selector: 'talks-app',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent extends BaseComponent{

  constructor(errorService : ErrorService){
    super(errorService);
  }
}