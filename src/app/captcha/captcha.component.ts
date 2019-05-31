import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {
  siteKeyCaptcha;
  public isCaptchaSuccess: boolean;

  constructor() {
  }

  ngOnInit() {
    this.siteKeyCaptcha = '6LffU6YUAAAAAOpyUKLFjB5yKXuuOPS_5MMFKP_N';
  }

  captchaSuccess() {
    alert('Captcha success');
    this.isCaptchaSuccess = true;
  }
}
