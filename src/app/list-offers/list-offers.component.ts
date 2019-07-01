import {Component, OnInit} from '@angular/core';
import {OfferDTO} from '../create-offer/models/offerDTO';
import {ListOfferService} from './list-offer.service';
import {CustomerDTO} from '../create-offer/models/customerDTO';
import {NotifierService} from 'angular-notifier';
import {DatePipe, formatDate} from "@angular/common";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.css']
})
export class ListOffersComponent implements OnInit {

  private offerDTOs: OfferDTO[];
  private customerDTO: CustomerDTO;
  private userId: number;
  private role: string;
  timerEnds = new Array<boolean>();
  dayInMs = 86400000;

  constructor(private listOfferService: ListOfferService, private readonly notifier: NotifierService) {}

  ngOnInit() {
    window.scroll(0, 0);
    this.delay(1200);
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
  }

  private getOfferDTOs(): void {
    this.listOfferService.getAllOffers()
      .subscribe((x) => {
          this.offerDTOs = x;
          console.log(x);
        },
        (error) => {
          console.log(error);
        });
  }

  private deleteOfferDTOById(id: number) {
    console.log(id);
    this.listOfferService.deleteOfferById(id)
      .subscribe((x) => {
        console.log(x);
        this.notifier.notify('success', 'Offer was deleted!');
        this.getOfferDTOs();
      }, (error) => {
        console.log(error);
      });
  }

  private getCustomerDTOByUserId(id: number): void {
    this.listOfferService.getCustomerByUserId(id)
      .subscribe((x) => {
          this.customerDTO = x;
          console.log('customer:');
          console.log(x);
        },
        (error) => {
          console.log(error);
        });
  }

  private compareWithCustomerId(id: number): boolean {
    return this.isCustomer() && (this.customerDTO.id == id);
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

  private async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => this.getOfferDTOs());
  }


  onNotify(offerId: number) {
    this.timerEnds[offerId] = true;
  }

  getRemoveTime(offer: OfferDTO) {
    let date = new Date(offer.createDate);
    const removeTime = new Date(offer.removeDate).getTime();
    if ((removeTime - new Date().getTime()) <= this.dayInMs) {
      this.onNotify(offer.id);
    }
    return (removeTime);
  }

  continueOffer(offer: OfferDTO) {
    const datePipe = new DatePipe('en-US');
    const newRemoveDate = new Date();
    newRemoveDate.setDate(new Date(offer.removeDate).getDate() + 7);
    offer.removeDate = datePipe.transform(newRemoveDate, 'yyyy-MM-dd');
    this.listOfferService.updateOffer(offer).subscribe();
    this.timerEnds[offer.id] = false;
    delay(1200);
    this.ngOnInit();
  }
}
