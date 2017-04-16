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

import { AppRoutingModule } from './app-routing.module';

import { RegisterService } from './services/register.service';
import { LoginService } from './services/login.service';
import { UserIndexService } from './services/user-index.service';
import { HeartService } from './services/heart.service';

import { StringSplitPipe } from './pipes/string-split.pipe';

@NgModule({
  imports:[ BrowserModule ,
            FormsModule ,
            HttpModule,
            AppRoutingModule
  ],
  declarations:[ AppComponent ,
                 IndexComponent ,
                 LoginComponent , 
                 RegisterComponent ,
                 UserIndexComponent , 
                 UserComponent ,
                 StringSplitPipe
  ],
  providers: [ RegisterService ,
               LoginService ,
               UserIndexService ,
               HeartService
  ],
  bootstrap:[ AppComponent ]
})

export class AppModule { }