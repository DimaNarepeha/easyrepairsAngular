import {Component, OnInit} from '@angular/core';
import {OrderDTO} from '../create-offer/models/orderDTO';
import {CustomerDTO} from '../create-offer/models/customerDTO';
import {ListOrderService} from './list-contracts.service';
import {ProviderDTO} from '../create-offer/models/providerDTO';
import {NotifierService} from 'angular-notifier';
import * as fileSaver from 'file-saver';
import {UserDTO} from '../create-offer/models/userDTO';
import {FeedbackService} from '../feedback/feedback.service';
import {Feedback} from '../feedback/feedback';

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
  private userDTO: UserDTO;
  private feedback = new Feedback();

  constructor(private listOrderService: ListOrderService, private readonly notifier: NotifierService,
              private feedbackService: FeedbackService) {
  }

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
  }

  private getOrderDTOs(): void {
    this.listOrderService.getAllOrders()
      .subscribe((x) => {
          this.orderDTOs = x;
          this.orderDTOs.sort(this.sortFn);
          console.log(x);
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
        console.log(error);
      });
  }

  private getCustomerDTOByUserId(id: number): void {
    this.listOrderService.getCustomerByUserId(id)
      .subscribe((x) => {
          this.customerDTO = x;
          this.userDTO = x.userDTO;
        },
        (error) => {
          console.log(error);
        });
  }

  private getProviderDTOByUserId(id: number): void {
    this.listOrderService.getProviderByUserId(id)
      .subscribe((x) => {
          this.providerDTO = x;
          this.userDTO = x.userDTO;
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
          this.orderDTOs = this.orderDTOs.filter(item => {
            return (item.id !== x.id);
          });
          this.orderDTOs.push(x);
          this.orderDTOs.sort(this.sortFn);
          this.notifier.notify('success', 'Order approved!:');
        },
        (error) => {
          this.notifier.notify('success', error);
        });
  }

  private providerApproveOrderDTO(order: OrderDTO) {
    order.providerApproved = 'approved';
    this.listOrderService.updateOrder(order)
      .subscribe((x) => {
          this.orderDTOs = this.orderDTOs.filter(item => {
            return (item.id !== x.id);
          });
          this.orderDTOs.push(x);
          this.orderDTOs.sort(this.sortFn);
          this.notifier.notify('success', 'Order approved!:');
        },
        (error) => {
          this.notifier.notify('success', error);
        });
  }

  private createFeedbackFromCustomerToProvider(userTo: UserDTO, userFrom: UserDTO) {
    console.log(userTo);
    console.log(userFrom);
    // @ts-ignore
    this.feedback.addressedFrom = userFrom;
    // @ts-ignore
    this.feedback.addressedTo = userTo;
    console.log(this.feedback);
    this.feedbackService.addFeedback(this.feedback)
      .subscribe(data => {
        console.log(data);
        this.feedback = null;
      },
        (error) => {
          this.notifier.notify('error', error);
        });
  }

  private createFeedbackFromProviderToCustomer(userTo: UserDTO, userFrom: UserDTO) {
    console.log(userTo);
    console.log(userFrom);
    // @ts-ignore
    this.feedback.addressedFrom = userFrom;
    // @ts-ignore
    this.feedback.addressedTo = userTo;
    console.log(this.feedback);
    this.feedbackService.addFeedback(this.feedback)
      .subscribe(data => {
          console.log(data);
          this.feedback = null;
        },
        (error) => {
          this.notifier.notify('error', error);
        });
  }

  private async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => this.getOrderDTOs());
  }

  private closeOrderDTO(order: OrderDTO) {
    order.status = 'closed';
    this.listOrderService.updateOrder(order)
      .subscribe((x) => {
          this.notifier.notify('success', 'Order closed!:');
          this.createFeedbackFromCustomerToProvider(order.providerDTO.userDTO, order.customerDTO.userDTO);
          this.createFeedbackFromProviderToCustomer(order.customerDTO.userDTO, order.providerDTO.userDTO);
        },
        (error) => {
          this.notifier.notify('success', error);
        });
  }

  private receiveContractByEmail(id: number) {
    this.listOrderService.receiveContractByEmail(id, this.userDTO)
      .subscribe((x) => {
          this.notifier.notify('success', 'Contract sent!:');
        },
        (error) => {
          this.notifier.notify('success', error);
        });
  }

  private downloadContract(contractName: string) {
    this.listOrderService.downloadContract(contractName)
      .subscribe((x) => {
        const filename = x.headers.get('filename');
        this.saveFile(x.body, filename);
      });
  }

  private saveFile(data: any, filename?: string) {
    const blob = new Blob([data], {type: 'application/pdf'});
    fileSaver.saveAs(blob, 'contract');
  }

  sortFn(element1: OrderDTO , element2: OrderDTO) {
    return (element1.id - element2.id);
  }
}
