import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService) { }

  identityCheck(){
    const token: string = localStorage.getItem("accessToken");
    
    const decodeToken = this.jwtHelper.decodeToken(token);
    const exprationDate: Date = this.jwtHelper.getTokenExpirationDate(token);
    let expired;
    try{
      expired = this.jwtHelper.isTokenExpired(token);
    }catch{
      expired = true;
    }    
    _isAuthenticated = token != null && !expired;
  }
  
  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }

  getCurrentUserName(): string | null {
    if (this.isAuthenticated) {
      const token: string = localStorage.getItem("accessToken");
      const decodeToken = this.jwtHelper.decodeToken(token);
      return decodeToken?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || null;
    }
    return null;
  }
}

export let _isAuthenticated: boolean;