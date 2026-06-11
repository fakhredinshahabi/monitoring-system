import { Component, inject } from '@angular/core';
import { LoadingService } from '../../core/services/loding/loading-service';

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
})
export class Loading {
  private loadingService = inject(LoadingService);
  isloading = this.loadingService.isLoading;
}
