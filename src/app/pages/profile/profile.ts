import { Component, inject, Input } from '@angular/core';
import { Authservice } from '../../core/services/auth/authservice';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-profile',
  imports: [ButtonModule, DialogModule, InputTextModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  @Input('showDiloge') visible!: boolean;
  private http = inject(Authservice);

  showDialog() {
    this.visible = this.visible;
  }
  ngOnInit() {
    this.http.profile().subscribe((res) => console.log(res));
  }
}
