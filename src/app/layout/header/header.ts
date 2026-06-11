import { Component, EventEmitter, inject, Output } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { Authservice } from '../../core/services/auth/authservice';
import {
  ApiResponse,
  logoutData,
  _profileData,
} from '../../core/interfaces/auth.interface';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { Tokenservice } from '../../core/services/tokenservice/tokenservice';

@Component({
  selector: 'app-heder',
  imports: [
    InputGroupModule,
    InputTextModule,
    ButtonModule,
    InputGroupAddonModule,
    ToggleSwitchModule,
    AvatarModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Output() open = new EventEmitter<boolean>();
  private http = inject(Authservice);
  private router = inject(Router);
  private token = inject(Tokenservice);
  logout() {
    this.http.logout().subscribe({
      next: (res) => {
        if (res.success) {
          this.router.navigate(
            ['/login'],
            // , { replaceUrl: true }
          );
          this.token.clearTokens();
        }
      },
    });
  }

  seeProfile() {
    this.open.emit(true);
  }
  visible: boolean = false;
  profileFields!: _profileData;
  showDialog() {
    this.http.profile().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.profileFields = res.data;
        }
      },
    });
    console.log(12);
    this.visible = true;
  }
}
