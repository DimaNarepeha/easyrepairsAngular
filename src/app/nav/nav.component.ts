import {Component, OnInit} from '@angular/core';
import {ApiService} from '../core/api.service';
import {FormGroup} from '@angular/forms';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  displayOn = false;
  role: string;
  name: string;
  image: string;
  log: FormGroup;
  private readonly baseURL;
  avatarUrl: string = environment.baseURL + '/service-providers/image/';


  constructor(private service: ApiService) {
    this.baseURL = environment.baseURL;
  }

  onSubmit() {
    this.logout();
  }

  logout() {
    this.service.logoutme().subscribe();
  }

  public isUser() {
    return window.sessionStorage.getItem('user') != null;
  }


  public getName(): string {
    this.name = JSON.parse(window.sessionStorage.getItem('user')).userLogin;
    return this.name;
  }

  public getImage(): string {
    this.image = JSON.parse(window.sessionStorage.getItem('user')).image;
    return this.image;
  }

  public isAdmin(): boolean {
    this.role = JSON.parse(window.sessionStorage.getItem('user')).roles;
    return this.role.toString() === 'ADMIN';
  }

  public isCustomer(): boolean {
    this.role = JSON.parse(window.sessionStorage.getItem('user')).roles;
    return this.role.toString() === 'CUSTOMER';
  }

  public isProvider(): boolean {
    this.role = JSON.parse(window.sessionStorage.getItem('user')).roles;
    return this.role.toString() === 'PROVIDER';
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
