import {Component, OnInit} from '@angular/core';
import {OfferDTO} from './models/offerDTO';
import {CreateOfferService} from './create-offer.service';
import {ServiceDTO} from './models/serviceDTO';
import {LocationDTO} from './models/locationDTO';
import {CustomerDTO} from './models/customerDTO';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {

  offerDTOs: OfferDTO[];
  offerDTO: OfferDTO = new OfferDTO();
  serviceDTOs: ServiceDTO[];
  chosenServices: ServiceDTO[];

  constructor(private createOfferService: CreateOfferService) {
  }

  ngOnInit() {
    this.getServiceDTOs();
    this.getOfferDTOs();
    this.offerDTO.locationDTO = new LocationDTO();
    this.offerDTO.customerDTO = new CustomerDTO();
    this.offerDTO.locationDTO.country = 'Ukraine';
    this.offerDTO.locationDTO.region = 'Lvivska';
    this.offerDTO.locationDTO.city = 'Lviv';
    this.offerDTO.locationDTO.id = 3;
  }

  createOfferDTO(): void {
    this.chosenServices = this.serviceDTOs.filter(x => x.choose === true);
    console.log(this.chosenServices.length);
    if (this.chosenServices.length < 1) {
      alert('You should chose some services!');
      return;
    }

    this.offerDTO.serviceDTOs = this.chosenServices;
    this.offerDTO.id = 1;  // TODO
    this.offerDTO.customerDTO.id = 1;  // TODO
    this.offerDTO.locationDTO.id = 1;  // TODO
    this.offerDTO.locationDTO.country = 'Ukraine';
    this.offerDTO.locationDTO.region = 'Lvivska';
    this.offerDTO.locationDTO.city = 'Lviv';

    this.createOfferService.createOffer(this.offerDTO)
      .subscribe((x) => {
        console.log(x);
        alert('Offer was created!');
      }, (error) => {
        console.log(error);
        alert(error);
      });
    this.reset();
  }

  getOfferDTOs(): void {
    this.createOfferService.getAllOffers()
      .subscribe((x) => {
          this.offerDTOs = x;
          console.log(x);
        },
        (error) => {
          console.log(error);
        });
  }

  deleteOfferDTOById(id: number) {
    console.log(id);
    this.createOfferService.deleteOfferById(id)
      .subscribe((x) => {
        console.log(x);
        this.getOfferDTOs();
      }, (error) => {
        console.log(error);
      });
  }

  getServiceDTOs(): void {
    this.createOfferService.getAllServices()
      .subscribe((x) => {
          this.serviceDTOs = x, console.log(x);
        },
        (error) => {
          console.log(error);
        });
  }

  private reset() {
    this.offerDTO.description = null;
    this.offerDTO.startDate = null;
    this.serviceDTOs.forEach(x => x.choose = false);
    this.getOfferDTOs();
  }

  showServices(serviceDTOs: ServiceDTO[]) {
    let services: string = ' ';
    serviceDTOs.forEach(x => {
      console.log(x.serviceName);
      services.concat(x.serviceName);
    });
    console.log(services);
    alert(services.toString());
  }
}
