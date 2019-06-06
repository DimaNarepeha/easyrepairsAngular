import {PostInfo} from './post-info';

export class Post {
  id: number;
  header: string;
  mainDescription: string;
  mainPhoto: string;
  postInfo: Array<PostInfo>;
  createdDate: string;
}
