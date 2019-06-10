import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../core/api.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private service: ApiService) {
  }

  ngOnInit() {
    this.logout();
  }

  logout() {
    this.service.logoutme();
    this.deleteTokenAndUser();
    this.router.navigate(['']);
    console.log(window.sessionStorage.getItem('user'));
    console.log(window.sessionStorage.getItem('token'));
  }

  deleteTokenAndUser() {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('user');
  }
}
