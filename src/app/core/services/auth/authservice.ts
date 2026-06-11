import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environment/environment';
import {
  _user,
  ApiResponse,
  _LoginData,
  _RegisterData,
  _profileData,
  _getUserData,
  logoutData,
} from '../../interfaces/auth.interface';
import { Tokenservice } from '../tokenservice/tokenservice';
import {catchError, throwError} from 'rxjs';
import {ErrorHandlingService} from '../Error/error-handeling';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private http = inject(HttpClient);
  private token = inject(Tokenservice);
  private errorService=inject(ErrorHandlingService)

  login(user: _user): Observable<ApiResponse<_LoginData>> {
    return this.http.post<ApiResponse<_LoginData>>(
      `${environment.baseUrl}${environment.authApi.login}`,
      user,
    )
  }
  register(user: _user): Observable<ApiResponse<_RegisterData>> {
    return this.http.post<ApiResponse<_RegisterData>>(
      `${environment.baseUrl}${environment.authApi.register}`,
      user,
    );
  }
  logout(): Observable<ApiResponse<logoutData>> {
    return this.http.post<ApiResponse<logoutData>>(
      `${environment.baseUrl}${environment.authApi.logout}`,
      {},
    )
  }
  profile(): Observable<ApiResponse<_profileData>> {
    return this.http.get<ApiResponse<_profileData>>(
      `${environment.baseUrl}${environment.authApi.profile}`,
    );
  }
  refreshToken() {
    return this.http.post<ApiResponse<_LoginData>>(
      `${environment.baseUrl}${environment.authApi.refresh}`,
      { refreshToken: this.token.getRefreshToken() },
    );
  }

  getUser(): Observable<ApiResponse<_getUserData>> {
    return this.http.get<ApiResponse<_getUserData>>(
      `${environment.baseUrl}${environment.authApi.users}`,
    );
  }
}
