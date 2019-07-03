import {Component, OnInit} from '@angular/core';
import {CustomerStatus} from "../../customer/CustomerStatus";
import {CustomerService} from "../../customer/customer.service";
import {Customer} from "../../customer/customer";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit {
  customers: Customer [];
  pages: Array<number>;
  private pageNumber = 0;
  private numberOfCustomersOnPage = 6;
  private status: CustomerStatus;
  private url = environment.customer_url;
  customerStatuses: CustomerStatus [] = [CustomerStatus.ACTIVE, CustomerStatus.BLOCKED];
  private delay: number;

  constructor(private customerService: CustomerService) {
    this.status = CustomerStatus.ACTIVE;
  }

  ngOnInit() {
    this.getCustomersByStatus(this.pageNumber, this.numberOfCustomersOnPage, CustomerStatus.ACTIVE);
  }

  setPage(pageNumber, event: any) {
    event.preventDefault();
    this.pageNumber = pageNumber;
    this.getCustomersByStatus(this.pageNumber, this.numberOfCustomersOnPage, this.status);
    window.scroll(0, 0);
  }

  getCustomersByStatus(page: number, numberOfCustomersOnPage: number, status: CustomerStatus): void {
    this.customerService.getCustomersByStatus(page, numberOfCustomersOnPage, status).subscribe((customersData) => {
        this.customers = customersData['content'];
        this.pages = new Array(customersData['totalPages']);
        console.log('customersData = ' + customersData);
      },
      (error) => {
        console.log(error);
      });
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
        this.customerService.getCustomersByFirstName(this.pageNumber, this.numberOfCustomersOnPage, this.status, firstName).subscribe((customersData) => {
            console.log(customersData);
            this.customers = customersData['content'];
            this.pages = new Array(customersData['totalPages']);
          },
          (error) => {
            console.log(error);
          });
      }
    }, 700);
  }


}
