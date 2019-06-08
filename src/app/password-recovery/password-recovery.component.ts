import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../core/api.service';
import {HttpErrorResponse, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {
  recoveryForm: FormGroup;
  invalidForm = false;
  msg: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) {
  }

  onSubmit() {
    if (this.recoveryForm.invalid) {
      return;
    }
    const body = new HttpParams()
      .set('email', this.recoveryForm.controls.email.value);

    this.apiService.password_recovery(body.toString()).subscribe(next => {
        console.log(next);
        this.router.navigate(['login']);
      }, error => {
        this.handleError(error);
        this.invalidForm = true;
      }
    );
  }

  ngOnInit() {
    this.recoveryForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])]
    });
  }

  handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      this.msg = error.error.error_description;
    }
  }
}
