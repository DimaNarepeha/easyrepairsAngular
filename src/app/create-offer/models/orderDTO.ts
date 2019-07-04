import {CustomerDTO} from './customerDTO';
import {LocationDTO} from './locationDTO';
import {ServiceDTO} from './serviceDTO';
import {ProviderDTO} from './providerDTO';

export class OrderDTO {
  id: number;
  description: string;
  extraDetails: string;
  price: string;
  status: string;
  createDate: string;
  startDate: string;
  endDate: string;
  contractName: string;
  timeRequirement: string;
  customerApproved: string;
  providerApproved: string;
  customerDTO: CustomerDTO;
  providerDTO: ProviderDTO;
  locationDTO: LocationDTO;
  serviceDTOs: ServiceDTO[];
}
