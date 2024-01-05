import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, Spinnertype } from 'src/app/base/base/base.component';
import { List_Comment } from 'src/app/contracts/comment/List_Comment';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { CommentService } from 'src/app/services/common/models/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent extends BaseComponent implements OnInit {

  productCommentLists: { datas: List_Comment[], totalCount: number };
  productId: string;

  constructor(spiner: NgxSpinnerService,
    private commentService: CommentService,
    private alertifyService: AlertifyService,
    private activetadRoute: ActivatedRoute) {
    super(spiner)
  }

  ngOnInit() {
    this.activetadRoute.params.subscribe(
      async params => {
        this.productId = params["id"] ?? "error";
      }
    );
    this.read();
  }

  async read(){
      this.productCommentLists = await this.commentService.getComments(this.productId, 0, 5, () => this.HideSpinner(Spinnertype.BallAtom), errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }))
    console.log();
  }

  create() {
    const contentInputElement: HTMLTextAreaElement = document.querySelector('textarea[name="content"]');
    const ratingInputElement: HTMLInputElement = document.querySelector('input[name="rating"]:checked');
    const content: string = contentInputElement.value;
    const rating: number = parseInt(ratingInputElement.value, 10);

    this.ShowSpinner(Spinnertype.BallAtom);
    this.commentService.create(content, rating, this.productId, () => {
      this.HideSpinner(Spinnertype.BallAtom);
      this.alertifyService.message("Yorum başarıyla eklenmiştir.", {
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
    }, errorMessage => {
      this.alertifyService.message(errorMessage,
        {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
    });
  }
}
