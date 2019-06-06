import {Location} from '../location/location';
import {ProviderStatus} from './service-provider.status';

export class  ServiceProviders {
  id: number;
  name: string;
  email: string;
  description: string;
  image: any = File;
  lastUpdate: string;
  location: Location;
  status: ProviderStatus;
  raiting: number;
  registrationDate: string;
}
