import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs/internal/Observable';
import { ErrorHandlingService } from '../Error/error-handeling';
import { HttpClient } from '@angular/common/http';
import {token} from '../../interfaces/token.interface';
@Injectable({
  providedIn: 'root',
})
export class Tokenservice {
  private erorService = inject(ErrorHandlingService);
  private http = inject(HttpClient);
  private readonly ACCESS_TOKEN_KEY = 'access-token';
  private readonly REFRESH_TOKEN_KEY = 'refresh-token';
  constructor() {}
  saveTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }
  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }
  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }
  clearTokens() {
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }
  isLoggedIn(): boolean {
    return !!this.getAccessToken() && !!this.getRefreshToken();
  }

  getPaylod():token|null {
    let payload = this.getAccessToken();
    if (payload) {
      try {
        console.log(jwtDecode(payload));
        return jwtDecode(payload);

      } catch (err) {
         this.erorService.mapError(err);
        return null
      }
    }
    return null;
  }
  isTokenExpired() {
    const payload = this.getPaylod();
    if (!payload || !payload.exp) {
      return true;
    }
    let currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  }
  isAdmin():boolean {
  return   this.getPaylod()?.role==="ADMIN"
  }
    hasRole(roleName:string){
    return this.getPaylod()?.role ===roleName
    }

}
