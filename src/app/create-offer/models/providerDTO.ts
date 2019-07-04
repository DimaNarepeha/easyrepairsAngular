import {UserDTO} from './userDTO';
import {ServiceDTO} from './serviceDTO';

export class ProviderDTO {
  id: number;
  name: string;
  email: string;
  userDTO: UserDTO;
  serviceDTOs: ServiceDTO[];
}
