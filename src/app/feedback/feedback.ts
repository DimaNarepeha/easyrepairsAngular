import {User} from '../login/user';

export class Feedback {
  id: number;
  comment: string;
  rating: number;
  createdDate: string;
  userTo: string;
  userFrom: string;
  endDate: string;
  addressedFrom: User;
  addressedTo: User;
}
