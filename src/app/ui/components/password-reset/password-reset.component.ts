import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, Spinnertype } from 'src/app/base/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { LanguageService } from 'src/app/services/common/language.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth-service.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent extends BaseComponent {

  constructor(spinner:NgxSpinnerService,
    private userAuthService: UserAuthService,
    private alertifyService: AlertifyService,
    private languageService: LanguageService){
    super(spinner)
    this.languageService.setDefaultLanguage();
  }

  passwordReset(email: string) {
    this.ShowSpinner(Spinnertype.BallAtom)
    this.userAuthService.passwordReset(email, () => {
      this.HideSpinner(Spinnertype.BallAtom)
      this.alertifyService.message("Mail başarıyla gönderilmiştir.", {
        messageType: MessageType.Notify,
        position: Position.TopRight
      });
    })
  }

}