import { Service } from './service';

export class ProvidersCriteria {
  city: string;
  region: string;
  country: string ;
  services: Service[];
  minRating: number;
  sortByParam: string;
}
