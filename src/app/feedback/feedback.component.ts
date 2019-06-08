import {Component, OnInit} from '@angular/core';
import {FeedbackService} from './feedback.service';
import {Feedback} from './feedback';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  feedbacks: Feedback[];
  userId: any;
  private readonly notifier: NotifierService;

  currentRate = 5;

  constructor(private feedbackService: FeedbackService, notifier: NotifierService) {
    this.userId = JSON.parse(window.sessionStorage.getItem('user')).id;
    this.notifier = notifier;
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
    feedback.rating = this.currentRate;
    console.log(feedback);
    this.feedbackService.updateFeedback(feedback)
      .subscribe((response) => {
        console.log(response);
        this.notifier.notify('success', 'Feedback added')
        this.ngOnInit();
      }, (error) => {
        console.log(error);
      });


  }

}
