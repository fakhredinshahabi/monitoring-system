import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';
// import { Loading } from './shared/loading/loading';
// import { LoadingService } from './core/services/loding/loading-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast,
    // Loading
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('MonitoringSystem');
}
