import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  constructor() {}

  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, function(e) {
      if (e) {
        okCallback();
      } else {
      }
    });
  }
  success(message) {
    alertify.success(message);
  }
  warining(message) {
    alertify.warning(message);
  }
  error(message) {
    alertify.error(message);
  }
  message(message) {
    alertify.message(message);
  }
}
