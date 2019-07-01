import {CustomerDTO} from './customerDTO';
import {LocationDTO} from './locationDTO';
import {ServiceDTO} from './serviceDTO';
import {DateFormatter} from "@angular/common/src/pipes/deprecated/intl";
import {Data} from "@angular/router";

export class OfferDTO {
  id: number;
  description: string;
  createDate: string;
  startDate: string;
  endDate: string;
  removeDate: string;
  customerDTO: CustomerDTO;
  locationDTO: LocationDTO;
  serviceDTOs: ServiceDTO[];
}
