export interface ApiError {
  status: number;
  message: string;
  type: 'SYSTEM' | 'BUSINESS';
  details?: any;
  timestamp?: Date;
}
