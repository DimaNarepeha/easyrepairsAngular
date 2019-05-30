import {Component, OnInit} from '@angular/core';
import {VerificationService} from './verification.service';
import {ActivatedRoute} from '@angular/router';
import {isSuccess} from '@angular/http/src/http_utils';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  isSuccess: boolean;

  constructor(private verificationService: VerificationService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    // here we get last segment of the route
    let activationCode;
    this.route.pathFromRoot[1].url.subscribe(val => activationCode = val[val.length - 1].path);
    // verify user
    this.verificationService.verifyUser(activationCode).subscribe(value => this.isSuccess = true
      , error => this.isSuccess = false);
  }


}
