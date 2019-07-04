import {User} from '../login/user';

export class Feedback {
  id: number;
  comment: string;
  rating: number;
  createdDate: string;
  endDate: string;
  addressedFrom: User;
  addressedTo: User;
}
