export interface DevicesApi<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface _getDevices {
  items: _items[];
  meta?: _meta[];
}
export interface _getSingleDevice {
  items: _items;
}

export interface _items {
  id: string;
  name: string;
  status: 'online' | 'offline';
  astFirmware: string;
  createdAt: string;
}
export interface _meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
export interface _upload {
  fileUrl: string;
  uploaded: boolean;
}

export interface _uploadDeviceData {
  fileUrl: string;
  uploaded: boolean;
}
