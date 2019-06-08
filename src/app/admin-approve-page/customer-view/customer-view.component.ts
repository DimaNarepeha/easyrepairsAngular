import {Component, OnInit} from '@angular/core';
import {CustomerStatus} from "../../customer/CustomerStatus";
import {CustomerService} from "../../customer/customer.service";
import {Customer} from "../../customer/customer";

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit {
  customers: Customer [];
  pages: Array<number>;
  private pageNumber = 0;
  private numberOfCustomersOnPage = 4;
  private status: CustomerStatus;

  constructor(private customerService: CustomerService) {
    this.status = CustomerStatus.ACTIVE;
  }

  ngOnInit() {
    this.getCustomersByStatus(this.pageNumber, this.numberOfCustomersOnPage, CustomerStatus.ACTIVE);
  }

  setPage(pageNumber,event: any) {
    event.preventDefault();
    this.pageNumber = pageNumber;
    this.getCustomersByStatus(this.pageNumber,this.numberOfCustomersOnPage,this.status);
    window.scroll(0,0);
  }

  getCustomersByStatus (page: number, numberOfCustomersOnPage: number, status: CustomerStatus): void {
    console.log(status);
    this.customerService.getCustomersByStatus(page, numberOfCustomersOnPage, status).subscribe((customersData) => {
        this.customers = customersData['content'],
          this.pages = new Array(customersData['totalPages']);
        console.log('customersData = ' + customersData);
      },
      (error) => {
        console.log(error);
      });
  }

  setStatusForAllCustomers(customerStatus: CustomerStatus) {
    this.status = customerStatus;
    this.getCustomersByStatus(this.pageNumber, this.numberOfCustomersOnPage, this.status);

  }
}
