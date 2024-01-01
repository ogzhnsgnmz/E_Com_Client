import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Spinnertype } from 'src/app/base/base/base.component';
import { AuthService, _isAuthenticated } from 'src/app/services/common/auth.service';
import { CustomToastrService, TaostrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private jwtHelper: JwtHelperService, private router: Router, private toastrService: CustomToastrService, 
    private spinner: NgxSpinnerService,
    private authService: AuthService) {
  }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if(!_isAuthenticated){
      this.router.navigate(["login"], {queryParams: {returnUrl:state.url}});
      this.toastrService.message("Oturum açmanız gerekiyor!","Yetkisiz erişim",{
        messageType: TaostrMessageType.Warning,
        position: ToastrPosition.TopRight
      });
    }

    this.spinner.hide(Spinnertype.BallAtom);
    return true;
  }
}