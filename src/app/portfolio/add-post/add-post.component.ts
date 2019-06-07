import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Post} from '../post';
import {PortfolioService} from '../portfolio.service';


@Component({
  selector: 'app-registration',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})

export class AddPostComponent implements OnInit {

  post = new Post();
  portfolioId: number;

  constructor(private portfolioService: PortfolioService, private rout: ActivatedRoute) {
  }

  ngOnInit() {
    this.rout.params.subscribe(next => {
        this.portfolioId = next.id;
        console.log(this.portfolioId);
    }
    );
  }
}
