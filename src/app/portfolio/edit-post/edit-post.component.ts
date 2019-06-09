import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PortfolioService} from '../portfolio.service';
import {Post} from '../post';
import {environment} from '../../../environments/environment';
import {NotifierService} from 'angular-notifier';


@Component({
  selector: 'app-registration',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})

export class EditPostComponent implements OnInit {

  portfolioId: number;
  post = new Post();
  private imageUrl = environment.baseURL + '/service-providers/image/';
  private readonly notifier: NotifierService;

  constructor(private portfolioService: PortfolioService,
              private rout: ActivatedRoute,
              notifierService: NotifierService,
              private router: Router) {
    this.notifier = notifierService;
  }

  onSelectFile(event, id) {
    const file = event.target.files[0];
    this.portfolioService.uploadImage(file, id);
  }

  editPost() {
    if (this.post.mainDescription.length === 0 || this.post.header.length === 0) {
      this.notifier.notify('error', 'Fields must be filled');
    } else {
      this.portfolioService.updatePost(this.post)
        .subscribe((response) => {
          console.log(response);
          this.notifier.notify('success', 'Post has been updated');
          this.router.navigate(['/provider-portfolio/' + this.portfolioId]);
        }, (error) => {
          console.log(error);
        });
    }
  }

  deletePost() {
    this.portfolioService.deletePost(this.post)
      .subscribe((response) => {
        this.notifier.notify('success', 'Post has been deleted');
        this.router.navigate(['/provider-portfolio/' + this.portfolioId]);
      }, (error) => {
        console.log(error);
      });
  }

  ngOnInit() {
    this.rout.params.subscribe(next => {
        this.portfolioService.getPostById(next.id).subscribe(next => {
          this.post = next;
          this.portfolioId = this.post.portfolioId;
          console.log(this.post.mainPhoto);
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
