import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, Spinnertype } from 'src/app/base/base/base.component';
import { BaseUrl } from 'src/app/contracts/base_url';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';
import { List_Product } from 'src/app/contracts/list_product';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { CategoryService } from 'src/app/services/common/models/category.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CustomToastrService, TaostrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  categories: any;

  constructor(private productService:ProductService,
    private activetadRoute: ActivatedRoute,
    private fileService: FileService,
    private basketService: BasketService,
    spinner: NgxSpinnerService,
    private customToastrService: CustomToastrService,
    private categoryService: CategoryService) {
      super(spinner)
  }

  currentCategory: string;
  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  baseUrl: BaseUrl;
  pageSize: number = 12;
  pageList: number[] = [];

  products: List_Product[];
  async ngOnInit() {
    this.getCategories();
    this.baseUrl = await this.fileService.getBaseStorageUrl();
    this.activetadRoute.params.subscribe(
      async params => {
        this.currentCategory = params["category"] ?? 1;
        this.currentPageNo = parseInt(params["pageNo"] ?? 1);
        console.log(this.currentCategory);
        const data: {totalProductCount: number, products: List_Product[]} = await this.productService.read(null ,this.currentPageNo-1, this.pageSize, this.currentCategory, 
        ()=>{
  
        },
        errorMessage => {
  
        });
        this.products = data.products;

        this.products = this.products.map<List_Product>(p => {
          this.fileService.getBaseStorageUrl().then(url => {
            
          })
          const listProduct : List_Product = {
            id: p.id,
            createdDate: p.createdDate,
            imagePath: p.productImageFiles.length ? p.productImageFiles.find(p => p.showcase).path: "",
            name: p.name,
            price: p.price,
            stock: p.stock,
            updatedDate: p.updatedDate,
            productImageFiles: p.productImageFiles
          }
          return listProduct;
        });

        this.totalProductCount = data.totalProductCount;
        this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);
      
        this.pageList = [];

        if(this.currentPageNo - 3 <= 0)
          for(let i = 1; i<=7; i++)
            this.pageList.push(i);
        else if(this.currentPageNo+3 >= this.totalPageCount)
          for(let i = this.totalPageCount-6; i <= this.totalPageCount; i++)
            this.pageList.push(i);
        else
          for(let i = this.currentPageNo-3; i <= this.currentPageNo + 3; i++)
            this.pageList.push(i);
      }
    );
  }

  async getCategories(){
    this.categories = await this.categoryService.getAllCategories(0, 20);
  }

  async addToBasket(product: List_Product){
    this.ShowSpinner(Spinnertype.BallAtom);
    let _basketItem: Create_Basket_Item = new Create_Basket_Item();
    _basketItem.productId = product.id.toString();
    _basketItem.quantity = 1;
    await this.basketService.add(_basketItem);
    this.HideSpinner(Spinnertype.BallAtom);
    this.customToastrService.message("Ürün sepete eklenmiştir.", "Sepete Eklendi", {
      messageType: TaostrMessageType.Success,
      position: ToastrPosition.TopRight
    });
  }
}