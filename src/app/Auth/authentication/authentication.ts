import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authentication',
  imports: [
    InputGroupModule,
    InputTextModule,
    FormsModule,
    InputGroupAddonModule,
    ButtonModule,
    PasswordModule,
    RouterOutlet,
  ],
  templateUrl: './authentication.html',
  styleUrl: './authentication.scss',
})
export class Authentication {
  loading = signal(false);

  load() {
    this.loading.set(true);

    setTimeout(() => {
      this.loading.set(false);
    }, 2000);
  }
}
