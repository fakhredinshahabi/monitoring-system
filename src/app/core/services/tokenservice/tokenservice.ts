import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { _AccessToken } from '../../interfaces/auth.interface';
@Injectable({
  providedIn: 'root',
})
export class Tokenservice {
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }
  removeToken() {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }
  constructor() {}
  getPayload(): _AccessToken | null {
    const payload = this.getAccessToken();
    if (!payload) return null;
    try {
      return jwtDecode(payload);
    } catch (err) {
      console.log('adam dastresi', err);
      return null;
    }
  }
  isAdmin() {
    return this.getPayload()!.role === 'ADMIN';
  }
  /////////////////////refreshToken//////////////////////////////////
  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }
  removeRefreshToken(): void {
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  //////////////////accessToken//////////////////////////

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }
  cleanAccessToken(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }

  ////////////////////////////checkLogin///////////////////
  isLoggedIn(): boolean {
    return !!this.getRefreshToken() && !!this.getAccessToken();
  }
}
