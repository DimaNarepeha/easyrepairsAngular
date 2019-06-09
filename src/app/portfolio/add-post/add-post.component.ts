import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Post} from '../post';
import {PortfolioService} from '../portfolio.service';
import {NotifierService} from "angular-notifier";


@Component({
  selector: 'app-registration',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})

export class AddPostComponent implements OnInit {

  post = new Post();
  portfolioId: number;
  image: File;
  condition = false;
  private readonly notifier: NotifierService;

  constructor(private portfolioService: PortfolioService,
              private rout: ActivatedRoute,
              private router: Router,
              notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  onSelectFile(event) {
    this.image = event.target.files[0];
    this.condition = true;
  }

  createPost() {
    if (this.condition == false) {
      this.notifier.notify('error', 'Upload photo!');
    } else {
      if (this.post.mainDescription == null || this.post.header == null) {
        this.notifier.notify('error', 'Fields must be filled');
      } else {
        console.log('Portfolio id: '+ this.portfolioId);
        this.post.portfolioId = this.portfolioId;
        this.post.mainPhoto = this.image.name;
        this.portfolioService.createPost(this.post)
          .subscribe((response) => {
            console.log(response);
            this.portfolioService.uploadPhotoForAdding(this.image, response.id);
            this.router.navigate(['/provider-portfolio/' + this.portfolioId]);
          }, (error) => {
            console.log(error);
          });
        console.log(this.post);
      }
    }
  }

  ngOnInit() {
    this.rout.params.subscribe(next => {
        this.portfolioId = next.id;
        console.log(this.portfolioId);
      }
    );
  }
}
