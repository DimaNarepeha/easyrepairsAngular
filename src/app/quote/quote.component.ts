import {Component, OnInit} from '@angular/core';
import {SpGeneralService} from '../sp-general/sp-general.service';
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
    // this.serviceProviders = this.providerPage;
    // console.log(this.serviceProviders);


    this.feedbackService.getLatestComments()// TODO change hardcoded user here
      .subscribe(data => this.feedbacks = data);
  }

}
