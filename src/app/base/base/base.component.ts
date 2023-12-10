import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
  constructor(private spinner : NgxSpinnerService) {}

  ShowSpinner(spinnerNameType: Spinnertype){
    this.spinner.show(spinnerNameType);
    setTimeout(() => this.spinner.hide(spinnerNameType), 3000);
  }

  HideSpinner(spinnerNameType: Spinnertype){
    this.spinner.hide(spinnerNameType);
  }
}

export enum Spinnertype{
  BallAtom = "s1",
  ballScaleMultiple = "s2",
  ballSpinClockwiseFadeRotating = "s3"
}
