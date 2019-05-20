import {CustomerDTO} from './customerDTO';
import {LocationDTO} from './locationDTO';

export class OfferDTO {
  id: number;
  description: string;
  startDate: string;
  customer: CustomerDTO;
  location: LocationDTO;
}
