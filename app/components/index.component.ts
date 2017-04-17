import { Component } from '@angular/core';

import { BaseComponent } from './base.component';
import { ErrorService } from '../services/error.service';

@Component({
  selector: 'index-app',
  templateUrl: 'template/index.html',
  styleUrls: ['css/index.css'],
})
export class IndexComponent extends BaseComponent {
  constructor(errorService : ErrorService){
    super(errorService);
  }
}