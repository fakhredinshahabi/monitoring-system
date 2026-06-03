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
import { Password, PasswordModule } from 'primeng/password';
import { Router, RouterLink } from '@angular/router';
import {
  _ErrorAuth,
  _RegisterData,
  _user,
  ApiResponse,
} from '../../../core/interfaces/auth.interface';
import { Authservice } from '../../../core/services/auth/authservice';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NotificationService } from '../../../core/services/nofication/notificationService';
import { MessageModule } from 'primeng/message';
import { checkPassword } from '../../../core/validators/repassword.validator';

@Component({
  selector: 'app-registry',
  imports: [
    InputGroupModule,
    InputTextModule,
    FormsModule,
    InputGroupAddonModule,
    ButtonModule,
    PasswordModule,
    RouterLink,
    ReactiveFormsModule,
    ToastModule,
    MessageModule,
  ],
  templateUrl: './registry.html',
  styleUrl: './registry.scss',
  providers: [MessageService],
  standalone: true,
})
export class Registry {
  private router = inject(Router);
  private authService = inject(Authservice);
  private notif = inject(NotificationService);
  loading = signal(false);
  registerForm = new FormGroup(
    {
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.minLength(8)]),
      rePassword: new FormControl('', [Validators.required]),
    },
    [checkPassword],
  );

  getControlName(controlName: string) {
    return this.registerForm.get(controlName);
  }
  register() {
    if (this.registerForm.valid) {
      const user: _user = {
        email: this.registerForm.value.email as string,
        password: this.registerForm.value.password as string,
      };
      this.authService.register(user).subscribe({
        next: (res) => {
          this.notif.success('به صفحه لاگین منتقل می شوید', 'عملیات موفق');
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 8000);
        },
        error: (err: HttpErrorResponse) => {
          const authError = err.error as _ErrorAuth;

          if (authError) {
            if (authError.errors && authError.errors?.length > 0) {
              authError.errors
                .map((m) => m.message)
                .forEach((m) => console.log(m));
            } else {
              console.log(authError.error);
            }
          }
          return 'خطای نامشخص ';
        },
      });
    }
  }
}
