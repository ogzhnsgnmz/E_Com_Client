import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, Spinnertype } from 'src/app/base/base/base.component';
import { List_Comment } from 'src/app/contracts/comment/List_Comment';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { CommentService } from 'src/app/services/common/models/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})

export class CommentComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,
    private commentService: CommentService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService) {
    super(spinner)
  }


  displayedColumns: string[] = ['userName', 'message', 'edit', 'delete'];
  dataSource: MatTableDataSource<List_Comment> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getComments() {
    this.ShowSpinner(Spinnertype.BallAtom);
    const allLists: { datas: List_Comment[], totalCount: number } = await this.commentService.getComments(null, this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.HideSpinner(Spinnertype.BallAtom), errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }))

    this.dataSource = new MatTableDataSource<List_Comment>(allLists.datas);
    this.paginator.length = allLists.totalCount;
  }

  async pageChanged() {
    await this.getComments();
  }

  async ngOnInit() {
    await this.getComments();
  }
}