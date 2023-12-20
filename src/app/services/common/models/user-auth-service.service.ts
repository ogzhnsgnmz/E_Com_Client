import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomToastrService, TaostrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { Observable, first, firstValueFrom } from 'rxjs';
import { SocialUser } from '@abacritt/angularx-social-login';
import { Login_User } from 'src/app/shared/contracts/users/login-user';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }

  async login(usernameOrEmail: string, password: string, callBackFunction: ()=> void): Promise<Login_User>{
    const observable: Observable<Login_User | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller:"auth",
      action:"login"
    }, { usernameOrEmail, password})
    
    const tokenResponse: Login_User = await firstValueFrom(observable) as Login_User;
    if(tokenResponse.token){
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
    
      this.toastrService.message("Kullanıcı girişi başarıyla sağlanmıştır!", "Giriş başarılı!", {
        messageType: TaostrMessageType.Success,
        position: ToastrPosition.TopRight
      });
    }
    callBackFunction();
    return tokenResponse;
  }

  async googleLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      action: "google-login",
      controller: "auth"
    }, user);

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);

      this.toastrService.message("Google üzerinden giriş başarıyla sağlanmıştır.", "Giriş Başarılı", {
        messageType: TaostrMessageType.Success,
        position: ToastrPosition.TopRight
      });
    }

    callBackFunction();
  }

  async facebookLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      controller:"auth",
      action:"facebook-login"
    }, user);

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if(tokenResponse){
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);      
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);

      
      this.toastrService.message("Facebook üzerinden giriş başarıyla sağlanmıştır.", "Giriş Başarılı", {
        messageType: TaostrMessageType.Success,
        position: ToastrPosition.TopRight
      });
    }    
    
    callBackFunction();
  }

  async refreshTokenLogin(refreshToken: string, callBackFunction?: (state) => void) : Promise<any>{
    const observable: Observable<any | TokenResponse> = this.httpClientService.post({
      action: "refreshTokenLogin",
      controller: "auth"
    }, {refreshToken: refreshToken});

    try{
      const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

      if(tokenResponse){
        localStorage.setItem("accessToken", tokenResponse.token.accessToken);      
        localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
      }

      callBackFunction(tokenResponse ? true : false);
    }catch{
      callBackFunction(false);
    }   
  }

  async passwordReset(email: string, callBackFunction?: () => void){
    const observable: Observable<any> = this.httpClientService.post({
      controller: "auth",
      action: "password-reset"
    }, {email:email});

    await firstValueFrom(observable);
    callBackFunction();
  }

  async verifyResetToken(resetToken: string, userId: string, callBackFunction?: () => void): Promise<boolean>{
    const observable: Observable<any> = this.httpClientService.post({
      controller: "auth",
      action: "verify-reset-token"
    }, {
      resetToken: resetToken,
      userId: userId
    });

    const state: boolean = await firstValueFrom(observable);
    callBackFunction();
    return state;
  }
}
