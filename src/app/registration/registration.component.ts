import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Customer} from './customer';
import {RegistrationService} from './registration.service';
import {User} from './user';
import {Provider} from './provider';
import {CaptchaComponent} from '../captcha/captcha.component';
import {NotifierService} from 'angular-notifier';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  CustomerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern('[A-Z][a-z]*')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('[A-Z][a-z]*')]),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  ProviderForm = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  @ViewChild(CaptchaComponent)
  private captchaComponent: CaptchaComponent;
  private isCaptchaIgnored: boolean;
  customer = new Customer();
  user = new User();
  provider = new Provider();
  notifier: NotifierService;

  constructor(private router: Router, private registration: RegistrationService, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
  }

  registerCustomer() {
    if (this.CustomerForm.invalid || !CaptchaComponent.isCaptchaSuccessForRegistration) {
      this.markCustomerFormAsTouched();
      return;
    }
    this.user.username = this.CustomerForm.controls.username.value;
    this.user.password = this.CustomerForm.controls.password.value;
    this.customer.userDTO = this.user;
    this.customer.lastName = this.CustomerForm.controls.lastName.value;
    this.customer.firstName = this.CustomerForm.controls.firstName.value;
    this.customer.email = this.CustomerForm.controls.email.value;
    this.registration.createCustomer(this.customer).subscribe(data => {
        this.customer = data;
        this.notifier.notify('success', 'You has been registered as customer');
        this.router.navigate(['/login']);
      },
      err => {
        this.notifier.notify('error', 'Email or username already exist!');
      });
  }


  registerProvider() {
    if (this.ProviderForm.invalid || !CaptchaComponent.isCaptchaSuccessForRegistration) {
      this.markProviderFormAsTouched();
      return;
    }
    this.user.username = this.ProviderForm.controls.username.value;
    this.user.password = this.ProviderForm.controls.password.value;
    this.provider.userDTO = this.user;
    this.provider.name = this.ProviderForm.controls.name.value;
    this.provider.email = this.ProviderForm.controls.email.value;
    this.registration.createProvider(this.provider).subscribe(data => {
        this.provider = data;
        this.notifier.notify('success', 'You has been registered as provider');
        this.router.navigate(['/login']);
      },
      err => {
        this.notifier.notify('error', 'Email or username already exist!');
      }
    );
  }

  markProviderFormAsTouched() {
    this.ProviderForm.controls.username.markAsTouched();
    this.ProviderForm.controls.password.markAsTouched();
    this.ProviderForm.controls.email.markAsTouched();
    this.ProviderForm.controls.name.markAsTouched();
    this.isCaptchaIgnored = !CaptchaComponent.isCaptchaSuccessForRegistration;
  }

  markCustomerFormAsTouched() {
    this.CustomerForm.controls.username.markAsTouched();
    this.CustomerForm.controls.password.markAsTouched();
    this.CustomerForm.controls.email.markAsTouched();
    this.CustomerForm.controls.firstName.markAsTouched();
    this.CustomerForm.controls.lastName.markAsTouched();
    this.isCaptchaIgnored = !CaptchaComponent.isCaptchaSuccessForRegistration;
  }


}
