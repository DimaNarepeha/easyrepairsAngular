import {Component, OnInit} from '@angular/core';
import {ApiService} from '../core/api.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) {
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.invalidLogin = true;
      return;
    }
    const body = new HttpParams()
      .set('username', this.loginForm.controls.username.value)
      .set('password', this.loginForm.controls.password.value)
      .set('grant_type', 'password');

    this.apiService.login(body.toString()).subscribe(data => {
        window.sessionStorage.setItem('token', JSON.stringify(data));
        console.log(window.sessionStorage.getItem('token'));
        this.router.navigate(['recovery']);
      }, error => {
        this.invalidLogin = true;
      }
    );
  }

  ngOnInit() {
    window.sessionStorage.removeItem('token');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }
}
