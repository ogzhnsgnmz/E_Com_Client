import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr: ToastrService) {

  }

  message(message:string, title: string, toastrOptions: Partial<ToastrOptions>){
    this.toastr[toastrOptions.messageType](message, title,{
      positionClass:toastrOptions.position 
    });
  }
}

export class ToastrOptions{
  messageType?: TaostrMessageType;
  position?: ToastrPosition;
} 

export enum TaostrMessageType{
  Success = "success",
  Error = "error",
  Info = "info",
  Warning = "warning"
}

export enum ToastrPosition{
  TopRight = "toast-top-right",
  TopCenter = "toast-top-center",
  TopLeft = "toast-top-left",
  TopFullWidht = "toast-top-full-width",
  BottomRight = "toast-bottom-right",
  BottomCenter = "toast-bottom-center",
  BottomLeft = "toast-bottom-left",
  BottomFullWidht = "toast-bottom-full-width"
}