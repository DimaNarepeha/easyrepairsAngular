import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../core/api.service';
import {HttpErrorResponse, HttpParams} from '@angular/common/http';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {
  recoveryForm: FormGroup;
  invalidForm = false;
  msg: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, private notifier: NotifierService) {
  }

  onSubmit() {
    if (this.recoveryForm.invalid) {
      return;
    }
    const body = new HttpParams()
      .set('email', this.recoveryForm.controls.email.value);

    this.apiService.password_recovery(body.toString()).subscribe(next => {
        console.log(next);

      }, error => {
        this.handleError(error);
        this.invalidForm = true;
      }
    );
  }

  ngOnInit() {
    this.recoveryForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 200) {
        this.notifier.notify('success', 'Password changed');
        this.router.navigate(['login']);
      } else {
        this.msg = error.error.error_description;
        this.notifier.notify('error', this.msg);
      }
    }
  }
}
