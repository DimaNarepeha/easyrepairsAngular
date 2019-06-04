import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecurityRolesService {

  constructor() {
  }

  private static getRoles(role: string) {
    return JSON.parse(window.sessionStorage.getItem('user')).roles[0];
  }

  public static getUserId() {
    return JSON.parse(window.sessionStorage.getItem('user')).id;
  }

  public static isLoggedIn(): boolean {
    return window.sessionStorage.getItem('user') != null;
  }

  public static isAdmin(): boolean {
    return this.getRoles('ADMIN') === 'ADMIN';
  }

  public static isCustomer(): boolean {
    return this.getRoles('CUSTOMER') === 'CUSTOMER';
  }

  public static isProvider(): boolean {
    return this.getRoles('PROVIDER') === 'PROVIDER';
  }

}
