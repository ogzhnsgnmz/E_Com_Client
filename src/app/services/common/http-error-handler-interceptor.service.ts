import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, TaostrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAuthService } from './models/user-auth-service.service';
import { Spinnertype } from 'src/app/base/base/base.component';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(
    private toastrService: CustomToastrService, 
    private userAuthService: UserAuthService, 
    private router: Router, private spinner: NgxSpinnerService)
  {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(catchError(error => {
        switch(error.status){
          case HttpStatusCode.Unauthorized:

            this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken"), (state) => {
              if(!state){
                const url = this.router.url;
                if(url == "/products"){
                  this.toastrService.message("Sepete ürün eklemek için oturum açmanız gerekiyor!", "Oturum açınız!", {
                    messageType: TaostrMessageType.Warning,
                    position: ToastrPosition.TopRight
                  });
                }else{
                  this.toastrService.message("Bu işlemi yapmaya yetkiniz bulunmadı!", "Yetkisiz işlem!", {
                    messageType: TaostrMessageType.Warning,
                    position: ToastrPosition.TopRight
                  });
                }
              }
            }).then(data => {

            });
            break;
          case HttpStatusCode.InternalServerError:
            this.toastrService.message("Sunucuya erişilmiyor!", "Sunucu hatası!", {
              messageType: TaostrMessageType.Warning,
              position: ToastrPosition.BottomFullWidht
            });
            break;
          case HttpStatusCode.BadRequest:
            this.toastrService.message("Geçersiz istek yapıldı!", "Geçersiz istek!", {
              messageType: TaostrMessageType.Warning,
              position: ToastrPosition.BottomFullWidht
            });
            break;
          case HttpStatusCode.NotFound:
            this.toastrService.message("Sayfa bulunamadı!", "Sayfa bulunamadı!", {
              messageType: TaostrMessageType.Warning,
              position: ToastrPosition.BottomFullWidht
            });
            break;
          default:
            this.toastrService.message("Beklenmeyen bir hata meydana gelmiştir!", "Hata!", {
              messageType: TaostrMessageType.Warning,
              position: ToastrPosition.BottomFullWidht
            });
            break;
        }

        this.spinner.hide(Spinnertype.BallAtom);
        return of(error);  
      }));
    }
}
