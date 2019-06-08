import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecurityRolesService {

  constructor() {
  }

  private getRoles(role: string) {
    return JSON.parse(window.sessionStorage.getItem('user')).roles[0];
  }

  public getUserId() {
    return JSON.parse(window.sessionStorage.getItem('user')).id;
  }

  public isLoggedIn(): boolean {
    return window.sessionStorage.getItem('user') != null;
  }

  public isAdmin(): boolean {
    return this.getRoles('ADMIN') === 'ADMIN';
  }

  public isCustomer(): boolean {
    return this.getRoles('CUSTOMER') === 'CUSTOMER';
  }

  public isProvider(): boolean {
    return this.getRoles('PROVIDER') === 'PROVIDER';
  }

}
