import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {
  siteKeyCaptcha = '6LffU6YUAAAAAOpyUKLFjB5yKXuuOPS_5MMFKP_N';
  public isCaptchaSuccess: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  captchaSuccess() {
    this.isCaptchaSuccess = true;
  }
}
