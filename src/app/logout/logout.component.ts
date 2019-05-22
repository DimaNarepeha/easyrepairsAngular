import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
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
