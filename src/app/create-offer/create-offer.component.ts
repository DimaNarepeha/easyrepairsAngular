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

    // this.offerDTO.locationDTO.country = this.addr.country; // TODO
    // this.offerDTO.locationDTO.region = this.addr.admin_area_l1;
    // this.offerDTO.locationDTO.city = this.addr.city;
    // this.offerDTO.locationDTO.id = 3;
  }

  setAddress(addrObj) {
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
      console.log(this.addrKeys);
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
    this.offerDTO.locationDTO.country = 'Ukraine123';
    this.offerDTO.locationDTO.region = 'Lvivska123';
    this.offerDTO.locationDTO.city = 'Lviv123';

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
