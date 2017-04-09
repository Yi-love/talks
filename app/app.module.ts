import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './components/app.component';
import { IndexComponent } from './components/index.component';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports:[ BrowserModule ,
            FormsModule ,
            HttpModule,
            AppRoutingModule
  ],
  declarations:[ AppComponent ,
                 IndexComponent ,
                 LoginComponent , 
                 RegisterComponent
  ],
  providers: [  ],
  bootstrap:[ AppComponent ]
})

export class AppModule { }