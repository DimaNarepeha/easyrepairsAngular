import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PortfolioService} from './portfolio.service';
import {Portfolio} from './portfolio';
import {Post} from './post';
import {ApiService} from "../core/api.service";


@Component({
  selector: 'app-registration',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})

export class PortfolioComponent implements OnInit {

  portfolio = new Portfolio();
  posts = new Array<Post>();
  readMoreField = 'Read more';
  isProvider: boolean;
  isAdmin: boolean;
  msg: string;

  constructor(private portfolioService: PortfolioService, private rout: ActivatedRoute, private apiService: ApiService) {
    this.isAdmin = apiService.isAdmin();
    this.isProvider = apiService.isProvider();
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
        }, error => {
        });
      }
    );
  }

}
