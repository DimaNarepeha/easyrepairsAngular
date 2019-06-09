import {Component, OnInit} from '@angular/core';
import {Feedback} from '../core/model/feedback';
import {LandingPageService} from '../landing-page/landing-page.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {

  private feedback: Feedback;
  private feedbacks: Feedback[];
  private url = environment.baseURL + '/service-providers/image/';


  constructor(private feedbackService: LandingPageService) {
  }

  ngOnInit() {
    this.feedbackService.getLatestComments()
      .subscribe(data => this.feedbacks = data);
  }

}
