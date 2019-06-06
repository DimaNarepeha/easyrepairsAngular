import {Component, OnInit} from '@angular/core';
import {FeedbackService} from './feedback.service';
import {Feedback} from './feedback';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  feedbacks: Feedback[];
  oneFeedback = new Feedback();
  userId: any;

  currentRate = 5;

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

  sendFeedback(feedback: Feedback) {
    // this.oneFeedback.id = id;
    // this.oneFeedback.comment = comment;
    // this.oneFeedback.userFrom = userFrom;
    // this.oneFeedback.userTo = userTo;
    // this.oneFeedback.rating = rating;
    // this.oneFeedback.addressedTo = addressedTo;
    // this.oneFeedback.addressedFrom = addressedFrom;
    // console.log(this.oneFeedback);
    feedback.rating = this.currentRate;
    console.log(feedback);
    this.feedbackService.updateFeedback(feedback)
      .subscribe((response) => {
        console.log(response);
        alert('Feedback added!');
        this.ngOnInit();
      }, (error) => {
        console.log(error);
      });


  }

}
