import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {Router} from '@angular/router';

@Injectable()
export class ExceptionHandler {

  private readonly notifier: NotifierService;

  constructor(notifierService: NotifierService, private router: Router) {
    this.notifier = notifierService;
  }

  handleError(error: any): Observable<any> {
    if ((error.status === 404)) {
      this.notifier.notify('error', 'This page not found, sorry try again');
      this.router.navigate(['/not-found']);
    } else if (error.status === 400) {
      this.notifier.notify('error', 'Something going wrong. Try again');
    } else if (error.status === 401) {
      this.notifier.notify('error', 'You must log in in our web-application');
      this.router.navigate(['/login']);
    } else if (error.status === 403) {
      this.notifier.notify('error', 'You don`t have permission');
      this.router.navigate(['/']);
    } else if ((error.status === 500) || (error.status === 0)) {
      this.notifier.notify('error', 'Connection lost');
      this.router.navigate(['/server-error']);
    }
    console.log(error);
    return throwError(error);
  }

}
