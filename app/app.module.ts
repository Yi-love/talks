import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './components/app.component';
import { IndexComponent } from './components/index.component';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { UserIndexComponent } from './components/user-index.component';
import { UserComponent } from './components/user.component';
import { ErrorComponent } from './components/error.component';

import { SwipeDirective } from './directives/swipe.directive';

import { FormatNumberPipe } from './pipes/format-number.pipe';

import { AppRoutingModule } from './app-routing.module';

import { RegisterService } from './services/register.service';
import { LoginService } from './services/login.service';
import { UserIndexService } from './services/user-index.service';
import { HeartService } from './services/heart.service';
import { ErrorService } from './services/error.service';

/**
 * 使用到的模块需要在这里进行注入
 */

@NgModule({
  imports:[ BrowserModule ,
            FormsModule ,
            HttpModule ,
            AppRoutingModule
  ],
  declarations:[ AppComponent ,
                 IndexComponent ,
                 LoginComponent , 
                 RegisterComponent ,
                 UserIndexComponent , 
                 UserComponent ,
                 ErrorComponent , 
                 SwipeDirective ,
                 FormatNumberPipe
  ],
  providers: [ RegisterService ,
               LoginService ,
               UserIndexService ,
               HeartService ,
               ErrorService
  ],
  bootstrap:[ AppComponent ]
})

export class AppModule { }