import {Component, NgZone, OnInit} from '@angular/core';
import {OfferDTO} from './models/offerDTO';
import {CreateOfferService} from './create-offer.service';
import {ServiceDTO} from './models/serviceDTO';
import {LocationDTO} from './models/locationDTO';
import {formatDate} from '@angular/common';
import {Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {

  private offerDTO: OfferDTO = new OfferDTO();
  private serviceDTOs: ServiceDTO[];
  private chosenServices: ServiceDTO[];
  private addrKeys: string[] = null;
  private addr: object = null;
  private currentDate: string;
  private userId: number;
  private role: string;

  constructor(private createOfferService: CreateOfferService, private zone: NgZone, private router: Router,
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
    this.getServiceDTOs();
    this.offerDTO.locationDTO = new LocationDTO();
    const d = new Date();
    this.currentDate = formatDate(d, 'yyyy-MM-dd', 'en');
  }

  private setAddress(addrObj) {
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
      console.log(this.addrKeys);
      console.log(this.addr);
    });
  }

  private createOfferDTO(): void {
    // @ts-ignore
    if (this.addr === null || this.addrKeys === null) {
      this.notifier.notify('success', 'Enter location!');
      return;
    }

    this.chosenServices = this.serviceDTOs.filter(x => x.choose === true);
    if (this.chosenServices.length < 1) {
      this.notifier.notify('success', 'You should chose some services!');
      return;
    }
    if (!this.checkInputDates(this.offerDTO.startDate, this.offerDTO.endDate)) {
      this.notifier.notify('success', 'Please, select a valid date!');
      return;
    }

    this.offerDTO.serviceDTOs = this.chosenServices;
    // @ts-ignore
    this.offerDTO.locationDTO.country = this.addr.country;
    // @ts-ignore
    this.offerDTO.locationDTO.region = this.addr.admin_area_l1;
    // @ts-ignore
    this.offerDTO.locationDTO.city = this.addr.locality;

    this.createOfferService.createOffer(this.offerDTO)
      .subscribe((x) => {
        console.log(x);
        this.notifier.notify('success', 'Offer was created!');
      }, (error) => {
        console.log(error);
      });
    this.router.navigate(['./list-offers']);
  }

  private getCustomerDTOByUserId(id: number): void {
    this.createOfferService.getCustomerByUserId(id)
      .subscribe((x) => {
        this.offerDTO.customerDTO = x;
        console.log('customer:');
        console.log(x.id);  // TODO
      },
        (error) => {
          console.log(error);
        });
  }

  private getServiceDTOs(): void {
    this.createOfferService.getAllServices()
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
