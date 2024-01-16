import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, Spinnertype } from 'src/app/base/base/base.component';
import { List_Comment } from 'src/app/contracts/comment/List_Comment';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { CommentService } from 'src/app/services/common/models/comment.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent extends BaseComponent implements OnInit {

  productCommentLists: { datas: List_Comment[], totalCount: number, avrRating: number };
  productId: string;
  product: any;
  productImage: any;

  constructor(spiner: NgxSpinnerService,
    private commentService: CommentService,
    private alertifyService: AlertifyService,
    private activetadRoute: ActivatedRoute,
    private productService: ProductService) {
    super(spiner)
  }

  ngOnInit() {
    this.activetadRoute.params.subscribe(
      async params => {
        this.productId = params["id"] ?? "error";
      }
    );
    this.getProductImage();
    this.getProduct();
    this.read();
    
  }

  range(count: number): number[] {
    return Array.from({ length: count }, (value, index) => index);
  }

  async getProduct() {
    this.product = await this.productService.readById(this.productId,null,null,null);
  }

  async getProductImage(){
    this.productImage = await this.productService.readImage(this.productId);
    console.log(this.productImage[0]);
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
