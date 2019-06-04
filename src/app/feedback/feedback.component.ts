import {Component, OnInit} from '@angular/core';
import {Feedback} from '../core/model/feedback';
import {FeedbackService} from "./feedback.service";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  feedbacks: Feedback[];
  oneFeedback = new Feedback();
  userId: any;

  constructor(private feedbackService: FeedbackService) {
    this.userId = JSON.parse(window.sessionStorage.getItem('user')).id;
    console.log(this.userId);
  }

  ngOnInit() {
    this.getFeedbackByUserId();
  }

  getFeedbackByUserId() {
    this.feedbackService.getFeedbackByUserId(this.userId)
      .subscribe((feedback) => {
          this.feedbacks = feedback, console.log(feedback);
        },
        (error) => {
          console.log(error);
        });
  }

}
