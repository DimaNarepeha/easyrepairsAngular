import {UserDTO} from './userDTO';
import {ServiceDTO} from './serviceDTO';

export class ServiceProvider {
  id: number;
  name: string;
  email: string;
  userDTO: UserDTO;
  services: ServiceDTO[];
}
