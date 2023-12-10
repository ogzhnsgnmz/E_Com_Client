import { Component, OnInit } from '@angular/core';
import { HubUrls } from 'src/app/constants/HubUrls';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { SignalRService } from 'src/app/services/common/signalr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private signalRService: SignalRService, private alertify: AlertifyService) {
  signalRService.start(HubUrls.ProductHub);
  }
  ngOnInit(): void {
    this.signalRService.on("",ReceiveFunctions.ProductAddedMessageReceiveFunction, message => {
      this.alertify.message(message, {
        messageType: MessageType.Notify,
        position: Position.TopRight
      })
    });
  }
}