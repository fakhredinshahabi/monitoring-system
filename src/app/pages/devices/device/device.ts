import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { _getSingleDevice } from '../../../core/interfaces/devices.interface';
import { DevicesService } from '../../../core/services/devices/devices-service';

@Component({
  selector: 'app-device',
  imports: [ButtonModule, DialogModule, InputTextModule],
  templateUrl: './device.html',
  styleUrl: './device.scss',
})
export class Device {
  private devicesService = inject(DevicesService);
  visible: boolean = false;
  deviceFields!: _getSingleDevice;
  showItem(id: string) {
    this.devicesService.getSingleDevice(id).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.deviceFields = res.data;
        }
      },
    });
    this.visible = true;
  }
}
