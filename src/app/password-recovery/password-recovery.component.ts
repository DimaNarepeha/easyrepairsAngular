import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {
  recoveryForm: FormGroup;

  constructor() { }
  ngOnInit() {
  }

  onSubmit() {
    if (this.recoveryForm.invalid) {
      return;
    }
  }
}
