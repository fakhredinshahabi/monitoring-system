// import { Injectable } from '@angular/core';
// import {HttpErrorResponse} from '@angular/common/http';
// import {ApiError} from '../../interfaces/error.interface';
//
// @Injectable({
//   providedIn: 'root',
// })
// export class ErrorHandelingService {
//   mapError(error:any): any {
//     let apiError:ApiError;
//     if(error.status===0){
//       apiError={
//         status:0,
//         message:error.message,
//         type:"SYSTEM",
//         timestamp:new Date(),
//         details:error.details,
//       }
//     }
//     if(error instanceof HttpErrorResponse){
//       apiError = this.handelError(error)
//     }
//     if(error.status===-1){
//       apiError={
//         status:-1,
//         message:"unknow error",
//         type:"SYSTEM",
//         timestamp:new Date(),
//         details:error.details,
//       }
//     }
//     return apiError;
//
//   }
//   handelError(error:HttpErrorResponse):ApiError{
// if(error.status===0){
//   return {
//     status:0,
//     message:"conection failed",
//     type:"SYSTEM",
//     timestamp:new Date(),
//     details:error.message,
//   }
// }
//
//     if(error.status===400){
//       return {
//         status:400,
//         message:"Bad Request",
//         type:"BUSINESS",
//         timestamp:new Date(),
//         details:error.message,
//       }
//     }
//
//     if(error.status===401){
//       return {
//         status:401,
//         message:"Unauthorized",
//         type:"BUSINESS",
//         timestamp:new Date(),
//         details:error.message,
//       }
//     }
//
//
//     if(error.status===403){
//       return {
//         status:403,
//         message:"Forbidden",
//         type:"BUSINESS",
//         timestamp:new Date(),
//         details:error.message,
//       }
//     }
//
//
//     if(error.status===404){
//       return {
//         status:404,
//         message:"Not Found",
//         type:"BUSINESS",
//         timestamp:new Date(),
//         details:error.message,
//       }
//     }
//
//
//     if(error.status===408){
//       return {
//         status:408,
//         message:"Request Timeout",
//         type:"BUSINESS",
//         timestamp:new Date(),
//         details:error.message,
//       }
//     }
//
//
//     if(error.status===409){
//       return {
//         status:409,
//         message:"Conflict",
//         type:"BUSINESS",
//         timestamp:new Date(),
//         details:error.message,
//       }
//     }
//
//
//     if(error.status===413){
//       return {
//         status:413,
//         message:"Payload Too Large",
//         type:"BUSINESS",
//         timestamp:new Date(),
//         details:error.message,
//       }
//     }
//
//
//     if(error.status >500){
//       return {
//         status:500,
//         message:"Internal Server Error",
//         type:"BUSINESS",
//         timestamp:new Date(),
//         details:error.message,
//       }
//     }
//
// return {
//   status:error.status,
//   message:error.message,
//   type:"SYSTEM",
//   timestamp:new Date(),
//   details:error.message,
// }
//   }
//
//
// }
////////////////////////////////////////
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from '../../interfaces/error.interface';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService { // اصلاح املا: Handling

  mapError(error: any): ApiError {
    // اگر خطای HTTP بود، به متد اصلی بفرست
    if (error instanceof HttpErrorResponse) {
      return this.handleError(error);
    }

    // فال‌بک برای خطاهای غیر HTTP (مثل قطعی کامل شبکه یا خطای جاوااسکریپت)
    return {
      status: error.status || 0,
      message: error.message || 'Unknown error occurred',
      type: 'SYSTEM',
      timestamp: new Date(),
      details: error.details || error.message,
    };
  }

  private handleError(error: HttpErrorResponse): ApiError {
    let message = 'An unexpected error occurred';
    let type: 'SYSTEM' | 'BUSINESS' = 'SYSTEM';

    switch (error.status) {
      case 0:
        message = 'Connection failed. Please check your internet.';
        break;
      case 400:
        message = 'Bad Request';
        type = 'BUSINESS';
        break;
      case 401:
        message = 'Unauthorized';
        type = 'BUSINESS';
        break;
      case 403:
        message = 'Forbidden';
        type = 'BUSINESS';
        break;
      case 404:
        message = 'Not Found';
        type = 'BUSINESS';
        break;
      case 408:
        message = 'Request Timeout';
        type = 'BUSINESS';
        break;
      case 409:
        message = 'Conflict';
        type = 'BUSINESS';
        break;
      case 413:
        message = 'Payload Too Large';
        type = 'BUSINESS';
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        message = 'Internal Server Error';
        type = 'SYSTEM'; // اصلاح: خطای سرور SYSTEM است، نه BUSINESS
        break;
      default:
        message = error.message || 'Unknown Error';
        type = error.status >= 500 ? 'SYSTEM' : 'BUSINESS';
        break;
    }

    return {
      status: error.status,
      message,
      type,
      timestamp: new Date(),
      details: error.error?.message || error.message, // استخراج بهتر جزئیات از پاسخ سرور
    };
  }
}
