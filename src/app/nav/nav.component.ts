import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  displayOn = false;
  role: string;
  name: string;

  constructor() {
  }

  public isUser() {
    return window.sessionStorage.getItem('user') != null;
  }


  public getName(): string {
    this.name = JSON.parse(window.sessionStorage.getItem('user')).userLogin;
    return this.name;
  }

  public isAdmin(): boolean {
    this.role = JSON.parse(window.sessionStorage.getItem('user')).roles;
    return this.role == 'ADMIN';
  }

  public isCustomer(): boolean {
    this.role = JSON.parse(window.sessionStorage.getItem('user')).roles;
    return this.role == 'CUSTOMER';
  }

  public isProvider(): boolean {
    this.role = JSON.parse(window.sessionStorage.getItem('user')).roles;
    return this.role == 'PROVIDER';
  }

  ngOnInit() {

  }

  firstClick() {
    this.displayOn = true;
  }

  closeMenu() {
    this.displayOn = false;
  }

}
