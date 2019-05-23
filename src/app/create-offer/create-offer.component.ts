import {Component, NgZone, OnInit} from '@angular/core';
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
  public addrKeys: string[];
  public addr: object;

  constructor(private createOfferService: CreateOfferService, private zone: NgZone) {
  }

  ngOnInit() {
    this.getServiceDTOs();
    this.getOfferDTOs();
    this.offerDTO.locationDTO = new LocationDTO();
    this.offerDTO.customerDTO = new CustomerDTO();
    this.offerDTO.locationDTO.country = '';
    this.offerDTO.locationDTO.region = '';
    this.offerDTO.locationDTO.city = '';
  }

  setAddress(addrObj) {
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
      console.log(this.addrKeys);
      console.log(this.addr);
    });
  }

  createOfferDTO(): void {
    this.chosenServices = this.serviceDTOs.filter(x => x.choose === true);
    console.log(this.chosenServices.length);
    if (this.chosenServices.length < 1) {
      alert('You should chose some services!');
      return;
    }

    this.offerDTO.serviceDTOs = this.chosenServices;
    this.offerDTO.customerDTO.id = 2;  // TODO
    // @ts-ignore
    this.offerDTO.locationDTO.country = this.addr.country;
    // @ts-ignore
    this.offerDTO.locationDTO.region = this.addr.admin_area_l1;
    // @ts-ignore
    this.offerDTO.locationDTO.city = this.addr.locality;

    this.createOfferService.createOffer(this.offerDTO)
      .subscribe((x) => {
        console.log(x);
        alert('Offer was created!');
        this.getOfferDTOs();
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

  getOfferDTOsByCustomerId(id: number): void {
    this.createOfferService.getOffersByCustomerId(id)
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
          this.serviceDTOs = x;
          console.log(x);
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
}
