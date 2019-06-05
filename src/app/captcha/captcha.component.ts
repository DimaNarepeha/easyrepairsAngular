import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {
  public static isCaptchaSuccessForRegistration: boolean;
  siteKeyCaptcha = '6LffU6YUAAAAAOpyUKLFjB5yKXuuOPS_5MMFKP_N';

  constructor() {
  }

  ngOnInit() {
    CaptchaComponent.isCaptchaSuccessForRegistration = false;
  }

  captchaSuccess() {
    CaptchaComponent.isCaptchaSuccessForRegistration = true;
  }
}
