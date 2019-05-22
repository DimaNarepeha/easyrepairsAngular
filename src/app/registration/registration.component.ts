import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Customer} from './customer';
import {RegistrationService} from './registration.service';
import {User} from "./user";
import {Provider} from "./provider";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  customer = new Customer();
  user = new User();
  provider = new Provider();

  constructor(private formBuilder: FormBuilder, private router: Router, private registration: RegistrationService) {}

  registerCustomer() {
    this.customer.userDTO = this.user;
    console.log(this.customer);
    this.registration.createCustomer(this.customer).subscribe(data => this.customer = data);
  }
  registerProvider() {
    this.provider.userDTO = this.user;
    console.log(this.provider);
    this.registration.createProvider(this.provider).subscribe(data => this.provider = data,
    err => {
      alert(err.toLocaleString());
    }
    );
  }

  ngOnInit(): void {
  }

  // ngOnInit(): void {
  //   this.heroForm = new FormGroup({
  //     'name': new FormControl(this.hero.name, [
  //       Validators.required,
  //       Validators.minLength(4),
  //       // forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
  //     ]),
  //
  //   });
  //
  // }
}
