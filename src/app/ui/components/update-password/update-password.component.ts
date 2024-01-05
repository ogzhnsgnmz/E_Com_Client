import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, Spinnertype } from 'src/app/base/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { LanguageService } from 'src/app/services/common/language.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth-service.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent extends BaseComponent {
  router: any;


  constructor(spinner: NgxSpinnerService, 
    private userAuthService: UserAuthService,
    private activatedRoute: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private languageService: LanguageService) {
    super(spinner);
    this.languageService.setDefaultLanguage();
  }
  
  state: any;

  ngOnInit(): void {
    this.ShowSpinner(Spinnertype.BallAtom)
    this.activatedRoute.params.subscribe({
      next: async params => {
        const userId: string = params["userId"];
        const resetToken: string = params["resetToken"];
        this.state = await this.userAuthService.verifyResetToken(resetToken, userId, () => {
          this.HideSpinner(Spinnertype.BallAtom);
        })
      }
    });
  }

  updatePassword(password: string, passwordConfirm: string){
    this.ShowSpinner(Spinnertype.BallAtom);
    if(password != passwordConfirm)
    {
      this.alertify.message("Şifreleri doğrulayınız!", {
        messageType: MessageType.Error,
        position: Position.TopRight
      });
      this.HideSpinner(Spinnertype.BallAtom);
      return;
    }

    this.activatedRoute.params.subscribe({
      next: async params => {
        const userId: string = params["userId"];
        const resetToken: string = params["resetToken"];
        await this.userService.updatePassword(userId, resetToken, password, passwordConfirm,
        ()=> {
          this.alertify.message("Şifre başarıyla güncellenmiştir.", {
            messageType: MessageType.Success,
            position: Position.TopRight
          })
          this.router.navigate(["/login"]);
        }, error => {

        });
        this.HideSpinner(Spinnertype.BallAtom);
      }
    });
  }
}
