import {Component, OnInit} from '@angular/core';
import {CustomerStatus} from "../../customer/CustomerStatus";
import {CustomerService} from "../../customer/customer.service";
import {Customer} from "../../customer/customer";
import {environment} from "../../../environments/environment";
import {NotifierService} from "angular-notifier";
import {DomSanitizer} from "@angular/platform-browser";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit {
  customers: Customer [];
  private pageNumber = 0;
  private numberOfCustomersOnPage = 6;
  private status: CustomerStatus;
  private url = environment.customer_url;
  urlImg = environment.baseURL +"/customers/image/";
  customerStatuses: CustomerStatus [] = [CustomerStatus.ACTIVE, CustomerStatus.BLOCKED];
  private delay: number;
  private page: number = 0;
  customer = new Customer();
  private readonly notifier: NotifierService;
  private customerPage: Array<any>;
  private pages: Array<number>;
  public userFile: any = File;
  public im: any;
  role: string;

  // constructor(private customerService: CustomerService) {
  //   this.status = CustomerStatus.ACTIVE;
  // }
  constructor(private customerService: CustomerService, private _sanitizer: DomSanitizer, notifierService: NotifierService) {
    this.status = CustomerStatus.ACTIVE;
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.getCustomersByStatus(this.pageNumber, this.numberOfCustomersOnPage, CustomerStatus.ACTIVE);
    // this.getCustomersByPage();
  }

  setPage(pageNumber, event: any) {
    event.preventDefault();
    this.pageNumber = pageNumber;
    this.getCustomersByStatus(this.pageNumber, this.numberOfCustomersOnPage, this.status);
    window.scroll(0, 0);
  }

  getCustomersByStatus(page: number, numberOfCustomersOnPage: number, status: CustomerStatus): void {
    this.customerService.getCustomersByStatus(page, numberOfCustomersOnPage, status).subscribe(
      data => {
        console.log(data);
        // const d = data.json();
        console.log(data);
        this.customerPage = data['content'];
        this.pages = new Array(data['totalPages']);
        console.log(data['content']);
        console.log(this.pages);
        console.log(this.customerPage);
        console.log(data);
        if (data['content'] != "") {
          this.isAnyCustomersPreset = true;
        }
      },
      (error) => {
        console.log(error);
      });
      // .subscribe((customersData) => {
      //   this.customers = customersData['content'];
      //   this.pages = new Array(customersData['totalPages']);
      //   console.log('customersData = ' + customersData);
      // },
      // (error) => {
      //   console.log(error);
      // });
  }

  updateCustomerStatus(id: number, status: CustomerStatus) {
    console.log(status);
    this.customerService.updateStatus(id, status).subscribe((customers) => {
        this.customers = customers['content'];
        this.setPage(this.pageNumber, event)
      },
      (error) => {
        console.log(error);
      });
  }

  setStatusForAllCustomers(customerStatus: CustomerStatus) {
    this.status = customerStatus;
    this.getCustomersByStatus(this.pageNumber, this.numberOfCustomersOnPage, this.status);
  }

  getCustomersByFirstName(firstName: string) {
    clearTimeout(this.delay);
    // @ts-ignore
    this.delay = setTimeout(() => {
      if (firstName == "") {
        this.getCustomersByStatus(this.pageNumber, this.numberOfCustomersOnPage, this.status);
      } else {
        this.customerService.getCustomersByFirstName(this.pageNumber, this.numberOfCustomersOnPage, this.status, firstName).subscribe(
          data => {
            console.log(data);
            // const d = data.json();
            console.log(data);
            this.customerPage = data['content'];
            this.pages = new Array(data['totalPages']);
            console.log(data['content']);
            console.log(this.pages);
            console.log(this.customerPage);
            console.log(data);
          },
          (error) => {
            console.log(error);
          });

          // .subscribe((customersData) => {
          //   console.log(customersData);
          //   this.customers = customersData['content'];
          //   this.pages = new Array(customersData['totalPages']);
          // },
          // (error) => {
          //   console.log(error);
          // });
      }
    }, 700);
  }


  // constructor(private customerService: CustomerService, private _sanitizer: DomSanitizer, notifierService: NotifierService) {
  //
  //   this.notifier = notifierService;
  // }
  //
  // ngOnInit(): void {
  //   this.getCustomersByPage();
  // }
  //
  // setPage(i, event: any) {
  //   event.preventDefault();
  //   this.page = i;
  //   this.getCustomersByPage();
  //
  // }


  formGroup: FormGroup = new FormGroup({
    firstname: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(60),
      Validators.pattern('[A-Z][a-z]*')
    ]),
    lastname: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(60),
      Validators.pattern('[A-Z][a-z]*')

    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(90),
      Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')
    ])
  });
  isAnyCustomersPreset: boolean;


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
      this.getCustomersByStatus(this.pageNumber, this.numberOfCustomersOnPage, CustomerStatus.ACTIVE);
    });
  }

  // getCustomersByPage() {
  //   return this.customerService.getCustomersPage(this.page).subscribe(
  //     data => {
  //       console.log(data);
  //       const d = data.json();
  //       console.log(d);
  //       this.customerPage = d['content'];
  //       this.pages = new Array(d['totalPages']);
  //       console.log(data['content']);
  //       console.log(this.pages);
  //       console.log(this.customerPage);
  //       console.log(data);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

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
          this.getCustomersByStatus(this.pageNumber, this.numberOfCustomersOnPage, CustomerStatus.ACTIVE);
          this.notifier.notify('success', 'Customer successfuly updated!');
        },
        (error) => {
          this.notifier.notify('error', 'Invalid data provided!');
          console.log(error);
        });
  }
  public isUser() {
    return window.sessionStorage.getItem('user') != null;
  }

  public isAdmin() {
    this.role = JSON.parse(window.sessionStorage.getItem('user')).roles;
    return this.role == 'ADMIN';
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
          this.notifier.notify('success', 'Customer deleted!');
          this.getCustomersByStatus(this.pageNumber, this.numberOfCustomersOnPage, CustomerStatus.ACTIVE);
        },
        (error) => {
          this.notifier.notify('error', 'Invalid data provided!');
          console.log(error);
        });

  }


  getCustomerById(customerId: string) {
    this.customerService.getCustomerById(customerId)
      .subscribe((customerData) => {
        this.customer = customerData;
        this.getCustomers();
      }, (error) => {
        this.notifier.notify('error', 'Invalid data provided!');
        console.log(error);
      });
  }



}
