import {Component, OnInit} from '@angular/core';
import {Customer} from './customer';
import {CustomerService} from './customer.service';
import {DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'customers',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})


export class CustomerComponent implements OnInit {
  private page: number = 0;
  customers: Customer[];
  customer = new Customer();
  private customerPage: Array<any>;
  private pages: Array<number>;
  public userFile: any = File;
  public im: any;

  constructor(private customerService: CustomerService, private _sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getCustomersByPage();
  }

  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.getCustomersByPage();

  }


  formGroup: FormGroup = new FormGroup({
    firstname: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(35)
    ]),
    lastname: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(255)
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(60),
      Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')
    ])
  });


  serveImage(image: string) {
    return this.customerService.getImage(image).subscribe(res => {
      this.im = this._sanitizer.bypassSecurityTrustUrl(res);
      console.log(this.im);


    });
  }


  onSelectFile(event, id) {
    const file = event.target.files[0];
    console.log(file);
    this.userFile = file;
    this.customerService.uploadImage(file, id).subscribe(res => {
      console.log(res);
      this.getCustomersByPage();
    });
  }

  getCustomersByPage() {
    return this.customerService.getCustomersPage(this.page).subscribe(
      data => {
        console.log(data);
        const d = data.json();
        console.log(d);
        this.customerPage = d['content'];
        this.pages = new Array(d['totalPages']);
        console.log(data['content']);
        console.log(this.pages);
        console.log(this.customerPage);
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCustomers(): void {
    this.customerService.getAllCustomers().subscribe(
      (customerData) => {
        this.customers = customerData; console.log(customerData);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addCustomer(): void {
    this.customerService.addCustomer(this.customer)
      .subscribe((response) => {
          console.log(response);
          this.reset();
          this.getCustomersByPage();
          alert('customer added/updated!');
        },
        (error) => {
          alert('Invalid data provided!');
          console.log(error);
        });
  }

  private reset() {
    this.customer.firstName = null;
    this.customer.lastName = null;
    this.customer.email = null;
    this.customer.image = '1.jpg';
  }

  deleteCustomer(customerId: string) {
    this.customerService.deleteCustomer(customerId)
      .subscribe((response) => {
          console.log(response);
          alert('customer deleted!');
          this.getCustomersByPage();
        },
        (error) => {
          alert('Invalid data provided!');
          console.log(error);
        });

  }


  getCustomerById(customerId: string) {
    this.customerService.getCustomerById(customerId)
      .subscribe((customerData) => {
        this.customer = customerData;
        this.getCustomers();
      }, (error) => {
        alert('Invalid data provided!');
        console.log(error);
      });
  }

}
