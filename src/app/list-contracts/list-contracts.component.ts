import {Component, OnInit} from '@angular/core';
import {OrderDTO} from '../create-offer/models/orderDTO';
import {CustomerDTO} from '../create-offer/models/customerDTO';
import {ListOrderService} from './list-contracts.service';
import {ProviderDTO} from '../create-offer/models/providerDTO';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-list-contracts',
  templateUrl: './list-contracts.component.html',
  styleUrls: ['./list-contracts.component.css']
})
export class ListContractsComponent implements OnInit {

  private orderDTOs: OrderDTO[];
  private customerDTO: CustomerDTO;
  private userId: number;
  private role: string;
  private providerDTO: ProviderDTO;

  constructor(private listOrderService: ListOrderService, private readonly notifier: NotifierService) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.delay(1000);
    if (JSON.parse(window.sessionStorage.getItem('user')) == null) {
      console.log('Stop loading!!!');
      this.notifier.notify('success', 'Something wrong. Maybe you have not login yet!');
      return;
    }
    this.userId = JSON.parse(window.sessionStorage.getItem('user')).id;
    this.role = JSON.parse(window.sessionStorage.getItem('user')).roles;
    if (this.isCustomer()) {
      this.getCustomerDTOByUserId(this.userId);
    }
    if (this.isProvider()) {
      this.getProviderDTOByUserId(this.userId);
    }
    // this.getOrderDTOs();
  }

  private getOrderDTOs(): void {
    this.listOrderService.getAllOrders()
      .subscribe((x) => {
          this.orderDTOs = x; console.log(x);
        },
        (error) => {
          console.log(error);
        });
  }

  private deleteOrderDTOById(id: number) {
    console.log(id);
    this.listOrderService.deleteOrderById(id)
      .subscribe((x) => {
        console.log(x);
        this.notifier.notify('success', 'Contract was deleted!');
        this.getOrderDTOs();
      }, (error) => {
        console.log('----------------------');
        console.log('deleteOrderDTOById:');
        console.log(error);
        console.log('----------------------');
      });
  }

  private getCustomerDTOByUserId(id: number): void {
    this.listOrderService.getCustomerByUserId(id)
      .subscribe((x) => {
          this.customerDTO = x;
          console.log('----------------------------');
          console.log('customer:');
          console.log(x);
          console.log('----------------------------');
        },
        (error) => {
          console.log(error);
        });
  }

  private getProviderDTOByUserId(id: number): void {
    this.listOrderService.getProviderByUserId(id)
      .subscribe((x) => {
          this.providerDTO = x;
          console.log('----------------------------');
          console.log('provider:');
          console.log(x);
          console.log('----------------------------');
        },
        (error) => {
          console.log(error);
        });
  }

  private compareWithCustomerId(id: number): boolean {
    return this.isCustomer() && (this.customerDTO.id == id);
  }

  private compareWithProviderId(id: number): boolean {
    return this.isProvider() && (this.providerDTO.id == id);
  }

  private isAdmin(): boolean {
    return (this.role.toString() === 'ADMIN');
  }

  private isCustomer(): boolean {
    return this.role.toString() === 'CUSTOMER';
  }

  private isProvider(): boolean {
    return this.role.toString() === 'PROVIDER';
  }

  private chooseOrderDTOById(id: number) {  // TODO
    this.notifier.notify('success', 'Sorry, but this function have not been created yet!');
  }

  private customerApproveOrderDTO(order: OrderDTO) {
    order.customerApproved = 'approved';
    this.listOrderService.updateOrder(order)
      .subscribe((x) => {
          this.notifier.notify('success', 'Order approved!:');
        },
        (error) => {
          this.notifier.notify('success', error);
          console.log('--------------------------');
          console.log('customerApproveOrderDTO');
          console.log(error);
          console.log('--------------------------');
        });
  }

  private providerApproveOrderDTO(order: OrderDTO) {
    order.providerApproved = 'approved';
    this.listOrderService.updateOrder(order)
      .subscribe((x) => {
          this.notifier.notify('success', 'Order approved!:');
        },
        (error) => {
          this.notifier.notify('success', error);
          console.log('--------------------------');
          console.log('providerApproveOrderDTO');
          console.log(error);
          console.log('--------------------------');
        });
  }

  private async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => this.getOrderDTOs());
  }
}
