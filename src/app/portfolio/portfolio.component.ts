import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PortfolioService} from './portfolio.service';
import {Portfolio} from './portfolio';
import {Post} from './post';
import {PostInfo} from './post-info';


@Component({
  selector: 'app-registration',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})

export class PortfolioComponent implements OnInit {

  portfolio = new Portfolio();
  posts = new Array<Post>();
  readMoreField = 'Read more';

  constructor(private portfolioService: PortfolioService, private rout: ActivatedRoute) {
  }

  readMoreClick() {
    if (this.readMoreField == 'Read more') {
      this.readMoreField = 'Read less';
    } else {
      this.readMoreField = 'Read more';
    }
  }

  ngOnInit() {
    this.rout.params.subscribe(next => {
        this.portfolioService.getPortfolioById(next.id).subscribe(next => {
          this.portfolio = next;
          this.posts = this.portfolio.postDTOs;
          console.log(this.portfolio);
          console.log(this.portfolio.postDTOs[2]);
        }, error1 => {
          console.log(error1);
        });
      }
      ,
      error2 => {
        console.log(error2);
      }
    );
  }
}
