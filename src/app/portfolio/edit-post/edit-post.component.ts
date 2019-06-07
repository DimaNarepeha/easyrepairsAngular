import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Portfolio} from '../portfolio';
import {PortfolioService} from '../portfolio.service';
import {Post} from '../post';


@Component({
  selector: 'app-registration',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})

export class EditPostComponent implements OnInit {

  portfolio = new Portfolio();
  posts = new Array<Post>();

  constructor(private portfolioService: PortfolioService, private rout: ActivatedRoute) {
  }

  ngOnInit() {
    this.rout.params.subscribe(next => {
        this.portfolioService.getPostById(next.id).subscribe(next => {
          this.portfolio = next;
          this.posts = this.portfolio.postDTOs;
        }, error1 => {
          console.log(error1);
        });
      }
      ,
      error2 => {
        console.log(error2);
      }
    )
    ;
  }
}
