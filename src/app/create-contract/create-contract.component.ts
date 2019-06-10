import {Component, NgZone, OnInit} from '@angular/core';
import {OrderDTO} from '../create-offer/models/orderDTO';
import {ServiceDTO} from '../create-offer/models/serviceDTO';
import {LocationDTO} from '../create-offer/models/locationDTO';
import {formatDate} from '@angular/common';
import {CreateOrderService} from './create-contract.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.css']
})
export class CreateContractComponent implements OnInit {

  private orderDTO: OrderDTO = new OrderDTO();
  private serviceDTOs: ServiceDTO[];
  private chosenServices: ServiceDTO[];
  private addrKeys: string[];
  private addr: object;
  private currentDate: string;
  private userId: number;
  private role: string;
  private providerId = 0;

  constructor(private createOrderService: CreateOrderService, private zone: NgZone,
              private activatedRoute: ActivatedRoute, private router: Router,
              private readonly notifier: NotifierService) {
  }

  ngOnInit() {
    window.scroll(0, 0);
    if (JSON.parse(window.sessionStorage.getItem('user')) == null) {
      console.log('Stop loading!!!');
      this.notifier.notify('success', 'Something wrong. Maybe you have not login yet!');
      this.router.navigate(['./']);  // TODO
    }
    this.userId = JSON.parse(window.sessionStorage.getItem('user')).id;
    this.role = JSON.parse(window.sessionStorage.getItem('user')).roles;
    if (this.isCustomer()) {
      this.getCustomerDTOByUserId(this.userId);
    }
    this.activatedRoute.params.subscribe((params) => {
      if (params.id == null) {
        this.router.navigate(['./']);  // TODO
      }
      this.providerId = params.id;
      this.getProviderById(this.providerId);
      console.log('proveder_id=' + this.providerId);

    });
    this.orderDTO.timeRequirement = 'approximate';
    this.getServiceDTOs();
    this.orderDTO.locationDTO = new LocationDTO();
    this.orderDTO.providerDTO = null;
    let d = new Date();
    this.currentDate = formatDate(d.setDate(d.getDate() - 1), 'yyyy-MM-dd', 'en');
  }

  private setAddress(addrObj) {
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
      console.log(this.addrKeys);
      console.log(this.addr);
    });
  }

  private createOrderDTO(): void {
    console.log(this.orderDTO.providerDTO);
    if (this.addr === null || this.addrKeys === null) {
      this.notifier.notify('success', 'Enter location!');
      return;
    }
    this.chosenServices = this.serviceDTOs.filter(x => x.choose === true);
    if (this.chosenServices.length < 1) {
      this.notifier.notify('success', 'You should chose some services!');
      return;
    }
    if (this.orderDTO.description == null) {
      this.notifier.notify('success', 'You should write some description!');
      return;
    }
    if (!this.checkInputDates(this.orderDTO.startDate, this.orderDTO.endDate)) {
      this.notifier.notify('success', 'Please, select a valid date!');
      return;
    }
    this.orderDTO.serviceDTOs = this.chosenServices;
    // @ts-ignore
    this.orderDTO.locationDTO.country = this.addr.country;
    // @ts-ignore
    this.orderDTO.locationDTO.region = this.addr.admin_area_l1;
    // @ts-ignore
    this.orderDTO.locationDTO.city = this.addr.locality;

    this.createOrderService.createOrder(this.orderDTO)
      .subscribe((x) => {
        console.log(x);
        this.notifier.notify('success', 'Contract was created!');
      }, (error) => {
        console.log(error);
      });
    this.router.navigate(['./list-contracts']);
  }

  private getCustomerDTOByUserId(id: number): void {
    this.createOrderService.getCustomerByUserId(id)
      .subscribe((x) => {
          this.orderDTO.customerDTO = x;
          console.log('customer:');
          console.log(x.id);  // TODO
        },
        (error) => {
          console.log(error);
        });
  }

  private getProviderById(id: number) {
    this.createOrderService.getProviderById(id)
      .subscribe((x) => {
          this.orderDTO.providerDTO = x;
          console.log('provider: ' + x.id);
        },
        (error) => {
        console.log(error);
        });
  }

  private getServiceDTOs(): void {
    this.createOrderService.getAllServices()
      .subscribe((x) => {
          this.serviceDTOs = x;
          console.log(x);
        },
        (error) => {
          console.log(error);
        });
  }

  private isCustomer(): boolean {
    return this.role.toString() === 'CUSTOMER';
  }

  private checkInputDates(startDate: string, endDate: string): boolean {
    const cDate = new Date(this.currentDate);
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);
    return ((sDate.getTime() <= eDate.getTime()) && (cDate.getTime() <= sDate.getTime()));
  }
}
