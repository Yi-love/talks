import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent }      from './components/index.component';
import { LoginComponent }      from './components/login.component';
import { RegisterComponent }  from './components/register.component';
import { UserIndexComponent } from './components/user-index.component';

const routes: Routes = [
  { path: '' , component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'userIndex/:uid', component: UserIndexComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}