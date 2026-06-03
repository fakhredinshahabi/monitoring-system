import { Component, inject } from '@angular/core';
import { Authservice } from '../../core/services/auth/authservice';
import { Table, TableModule } from 'primeng/table';
import { _profileData } from '../../core/interfaces/auth.interface';

@Component({
  selector: 'app-users',
  imports: [TableModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  private http = inject(Authservice);

  usersList!: _profileData[];

  ngOnInit() {
    this.http.getUser().subscribe({
      next: (res) => {
        if (res.data && res.data) {
          this.usersList = res.data.items;
        }
      },
    });
  }
}
