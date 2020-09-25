import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastAlertService {

  constructor(private toastr: ToastrService) {
  }

  public success(msg: string): void {
    this.toastr.success(msg);
  }

  public error(msg: string): void {
    this.toastr.error(msg);
  }

  public warning(msg: string): void {
    this.toastr.warning(msg);
  }

  public info(msg: string): void {
    this.toastr.info(msg);
  }
}
