import { Component, Input } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, TaostrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { Spinnertype } from 'src/app/base/base/base.component';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(
    private httpClientService: HttpClientService,
    private alterifyService: AlertifyService,
    private customtoastrService: CustomToastrService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService
    ) {}
  
  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;

    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }

    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState,
      afterClosed: ()=> {
        this.spinner.show(Spinnertype.BallAtom);
        this.httpClientService.post({
          controller: this.options?.controller,
          action: this.options?.action,
          queryString: this.options?.queryString,
          headers: new HttpHeaders({"responseType": "blob"})
        }, fileData).subscribe(data =>{
          const message: string = "Dosyalar başarıyla yüklenmiştir!";
          if(this.options?.isAdminPage){
            this.alterifyService.message(message,{
              dismissOthers: true,
              messageType: MessageType.Success,
              position: Position.TopRight
            })
          }else{
            this.customtoastrService.message(message, "Başarılı!", {
              messageType: TaostrMessageType.Success,
              position: ToastrPosition.TopRight
            })
          }
          this.spinner.hide(Spinnertype.BallAtom);
        },(errorResponse:HttpErrorResponse)=>{
          const message: string = "Dosyalar yüklenirken bir hatayla karşılaşılmıştır!";
          if(this.options?.isAdminPage){
            this.alterifyService.message(message,{
              dismissOthers: true,
              messageType: MessageType.Error,
              position: Position.TopRight
            })
          }else{
            this.customtoastrService.message(message, "Başarısız!", {
              messageType: TaostrMessageType.Error,
              position: ToastrPosition.TopRight
            })
          }
          this.spinner.hide(Spinnertype.BallAtom);
        });
      }
    });
  }
}


export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}