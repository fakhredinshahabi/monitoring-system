import { Component, inject, Inject, signal } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { Router, RouterLink } from '@angular/router';

import {
  _LoginData,
  _user,
  ApiResponse,
} from '../../../core/interfaces/auth.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Authservice } from '../../../core/services/auth/authservice';
import { Tokenservice } from '../../../core/services/tokenservice/tokenservice';
import { NotificationService } from '../../../core/services/nofication/notificationService';
@Component({
  selector: 'app-login',
  imports: [
    InputGroupModule,
    InputTextModule,
    FormsModule,
    InputGroupAddonModule,
    ButtonModule,
    PasswordModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authservice = inject(Authservice);
  loading = signal(false);
  private router = inject(Router);
  private tokenservice = inject(Tokenservice);
  private notif = inject(NotificationService);
  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  login() {
    if (this.formLogin.invalid) return;
    this.loading = signal(true);
    this.authservice.login(this.formLogin.value as _user).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.tokenservice.saveTokens(
            res.data.accessToken,
            res.data.refreshToken,
          );
          this.router.navigate(
            ['/layout'],

            // , { replaceUrl: true }
          );
          this.loading = signal(false);
        }
      },
      error: (er: HttpErrorResponse) => {
        this.notif.danger(er.error?.error || er.message, '');
        this.loading = signal(false);
      },
    });
  }
}
