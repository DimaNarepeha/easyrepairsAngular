import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Customer} from './customer';
import {RegistrationService} from './registration.service';
import {User} from './user';
import {Provider} from './provider';


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

  customer = new Customer();
  user = new User();
  provider = new Provider();

  constructor(private router: Router, private registration: RegistrationService) {}

  registerCustomer() {
    if (this.CustomerForm.invalid) {
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
        console.log(data);
        alert('successful!');
        this.router.navigate(['/login']);
      },
      err => {
        alert('Email or username already exist!!!');
      });
  }
  registerProvider() {
    if (this.ProviderForm.invalid) {
      return;
    }
    this.user.username = this.ProviderForm.controls.username.value;
    this.user.password = this.ProviderForm.controls.password.value;
    this.provider.userDTO = this.user;
    this.provider.name = this.ProviderForm.controls.name.value;
    this.provider.email = this.ProviderForm.controls.email.value;
    this.registration.createProvider(this.provider).subscribe(data => {
        this.provider = data;
        alert('successful!');
        this.router.navigate(['/login']);
      },
    err => {
      alert('Email or username already exist!!!');
    }
    );
  }

  ngOnInit(): void {
  }
}
