import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, Spinnertype } from 'src/app/base/base/base.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit  {
  constructor(private userAuthService: UserAuthService, 
    spinner : NgxSpinnerService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private authService: AuthService,
    private socialAuthService: SocialAuthService) 
  {
    super(spinner)
    socialAuthService.authState.subscribe(async ( user: SocialUser) => {
      this.ShowSpinner(Spinnertype.BallAtom);
      switch (user.provider) {
        case "GOOGLE":
          await userAuthService.googleLogin(user, () => { 
            this.authService.identityCheck();
            this.HideSpinner(Spinnertype.BallAtom);
          })
          break;
        case "FACEBOOK":
          await userAuthService.facebookLogin(user, () => {
            this.authService.identityCheck();
            this.HideSpinner(Spinnertype.BallAtom);
          })
          break;
      }
    });
  }

  ngOnInit(): void {
  }

  async login(usernameOrEmail: string, password: string) {
    this.ShowSpinner(Spinnertype.BallAtom);
    await this.userAuthService.login(usernameOrEmail, password, () => {
      this.authService.identityCheck();
      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"];
        if(returnUrl)
          this.router.navigate([returnUrl]);
      });
      this.HideSpinner(Spinnertype.BallAtom)
    });
  }

  facebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
