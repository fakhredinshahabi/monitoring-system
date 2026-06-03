import { Component, inject } from '@angular/core';
import { DevicesService } from '../../core/services/devices/devices-service';
import { BehaviorSubject } from 'rxjs';
import {
  _getSingleDevice,
  _items,
  _meta,
} from '../../core/interfaces/devices.interface';
import { AsyncPipe } from '@angular/common';

import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-devices',
  imports: [AsyncPipe, RouterOutlet],
  templateUrl: './devices.html',
  styleUrl: './devices.scss',
})
export class Devices {
  devices$ = new BehaviorSubject<_items[]>([]);
  meta$ = new BehaviorSubject<_meta[] | undefined>([]);
  private devicesService = inject(DevicesService);
  private router = inject(Router);
  private rote = inject(ActivatedRoute);
  visible: boolean = false;
  deviceFields!: _getSingleDevice;

  ngOnInit() {
    this.devicesService.getDevices().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.devices$.next(res.data.items);
          this.meta$.next(res.data.meta);
        }
      },
    });
  }

  showItem(id: string) {
    this.devicesService.getSingleDevice(id).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.deviceFields = res.data;
          // this.router.navigate(['/devices', id]); چون پرنت آنگولار مسیر از بعد / حساب مبکنه و پرنت کامپوننتمون که لی اوت هست رو حساب نمیکنه مسیر درست میشه ولی مطابق با روتی که تعریف کردیم نیست
          // this.router.navigate(['layout/devices', id]);
          this.router.navigate([id], { relativeTo: this.rote });
        }
      },
    });
    this.visible = true;
  }
}
