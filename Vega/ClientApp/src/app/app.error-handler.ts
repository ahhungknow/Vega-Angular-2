import { ErrorHandler,Inject, NgZone ,isDevMode} from "@angular/core";
import { ToastyService } from "ng2-toasty";

export class AppErrorHandler implements ErrorHandler {
  constructor(
    private ngZone:NgZone,
    @Inject(ToastyService) private toastyService: ToastyService) {

  }
  handleError(error: any): void {

    this.ngZone.run(() => {
      this.toastyService.error({
        title: 'Error',
        msg: 'An unexpected error happened',
        showClose: true,
        theme: '',
        timeout: 5000
      })
    })
    }
    
}
