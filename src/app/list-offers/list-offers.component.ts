import {Component, OnInit} from '@angular/core';
import {OfferDTO} from '../create-offer/models/offerDTO';
import {ListOfferService} from './list-offer.service';

@Component({
  selector: 'app-list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.css']
})
export class ListOffersComponent implements OnInit {

  offerDTOs: OfferDTO[];
  offerDTO: OfferDTO;

  constructor(private listOfferService: ListOfferService) { }

  ngOnInit() {
    this.getOfferDTOs();
  }

  getOfferDTOs(): void {
    this.listOfferService.getAllOffers()
      .subscribe((x) => {
          this.offerDTOs = x; console.log(x);
        },
        (error) => {
          console.log(error);
        });
  }

  getOfferDTOById(id: number) {
    this.listOfferService.getOfferById(id)
      .subscribe((x) => {
          this.offerDTO = x;
        },
        (error) => {
          console.log(error);
        });
  }

  chooseOfferDTOById(id: number) {  // TODO
    alert('You chose something but nothing happened. Sorry');
  }
}
