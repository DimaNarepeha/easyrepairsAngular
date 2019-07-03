import {PostInfo} from './post-info';

export class Post {
  id: number;
  header: string;
  mainDescription: string;
  mainPhoto: string;
  portfolioId: number;
  postInfo: Array<PostInfo>;
  createdDate: string;
  username: string;
}
