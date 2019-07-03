import {Post} from './post';
import {PostInfo} from './post-info';

export class Portfolio {
  id: number;
  providerId: number;
  userId: number;
  lastUpdate: string;
  postDTOs: Array<Post>;
}
