import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  DevicesApi,
  _getSingleDevice,
  _uploadDeviceData,
} from '../../interfaces/devices.interface';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private http = inject(HttpClient);

  uploadFile(
    id: string,
    file: File,
  ): Observable<HttpEvent<DevicesApi<_uploadDeviceData>>> {
    const formdata = new FormData();
    formdata.append('file', file, file.name);
    return this.http.post<DevicesApi<_uploadDeviceData>>(
      `${environment.baseUrl}${environment.devicesApi.devicesList}${'/' + id}/files`,
      formdata,
      {
        reportProgress: true,
        observe: 'events',
      },
    );
  }
}
