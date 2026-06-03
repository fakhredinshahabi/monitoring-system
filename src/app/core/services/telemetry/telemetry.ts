import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
@Injectable({
  providedIn: 'root',
})
export class Telemetry {
  websocket$?: WebSocketSubject<any> = webSocket('//ws:3000');

  sendWebSocket$(message: any) {
    this.websocket$?.next(message);
  }
  getWebsocket() {
    return this.websocket$ as Observable<any>;
  }
  closWebsocket() {
    this.websocket$?.complete();
  }
}
