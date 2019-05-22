import {CustomerDTO} from './customerDTO';
import {LocationDTO} from './locationDTO';
import {ServiceDTO} from './serviceDTO';

export class OfferDTO {
  id: number;
  description: string;
  startDate: string;
  customerDTO: CustomerDTO;
  locationDTO: LocationDTO;
  serviceDTOs: ServiceDTO[];
}
