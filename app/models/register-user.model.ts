import { User } from './user.model';

export class RegisterUser extends User{
  private repassword:string;

  constructor(){
    super();
  }
}