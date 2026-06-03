import { Component, inject, input } from '@angular/core';
import { UploadService } from '../../core/services/upload/upload';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { ProgressBarModule } from 'primeng/progressbar';
import {
  _uploadDeviceData,
  DevicesApi,
} from '../../core/interfaces/devices.interface';

@Component({
  selector: 'app-upload',
  imports: [ProgressBarModule],
  templateUrl: './upload.html',
  styleUrl: './upload.scss',
})
export class Upload {
  private uploadService = inject(UploadService);
  eventInput: any;
  id: number = 34;
  selectedFile: File | null = null;
  progress: number = 0;
  isError: boolean = false;
  maxSize: number = 50 * 1024 * 1024;
  errorMessage: string = 'فایل را انتخاب کنید';
  onFileSelected(e: Event) {
    const inputFiles = e.target as HTMLInputElement;

    if (inputFiles.files?.[0]) {
      this.selectedFile = inputFiles.files[0];
      const selectedFileSize = (this.selectedFile.size / 1024 / 1024).toFixed(
        2,
      );
      const selectedFileName = this.selectedFile.name;
      this.errorMessage =
        'فایل' + selectedFileName + '' + 'سایز:' + selectedFileSize + 'mb';
    }
  }
  uploadFile() {
    if (this.selectedFile)
      this.uploadService
        .uploadFile('5436d70c-1554-4d9f-9a6f-19db5116268a', this.selectedFile)
        .subscribe({
          next: (event: HttpEvent<DevicesApi<_uploadDeviceData>>) => {
            if (event && event.type === HttpEventType.UploadProgress) {
              this.errorMessage = 'loding';
              this.progress = 100 * event.loaded;
            }
            if (event && event.type === HttpEventType.Response) {
              this.errorMessage = 'compelet';
              this.progress = 1;
              console.log(event.body?.data);
            }
          },
        });
  }
}
