import {CustomerDTO} from './customerDTO';
import {LocationDTO} from './locationDTO';
import {ServiceDTO} from './serviceDTO';

export class OfferDTO {
  id: number;
  description: string;
  createDate: string;
  startDate: string;
  endDate: string;
  customerDTO: CustomerDTO;
  locationDTO: LocationDTO;
  serviceDTOs: ServiceDTO[];
}
