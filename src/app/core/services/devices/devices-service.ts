import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { _items, _getSingleDevice } from '../../interfaces/devices.interface';
import {
  _getDevices,
  _meta,
  DevicesApi,
} from '../../interfaces/devices.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  private http = inject(HttpClient);

  getDevices(
    currentPage: string = '1',
    itemperpage: string = '5',
  ): Observable<DevicesApi<_getDevices>> {
    let params = new HttpParams()
      .set('page', currentPage)
      .set('limit', itemperpage);
    return this.http.get<DevicesApi<_getDevices>>(
      `${environment.baseUrl}${environment.devicesApi.devicesList}`,
      { params },
    );
  }

  getSingleDevice(id: string): Observable<DevicesApi<_getSingleDevice>> {
    return this.http.get<DevicesApi<_getSingleDevice>>(
      `${environment.baseUrl}${environment.devicesApi.devicesList}${'/' + id}`,
    );
  }
}
