import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, Spinnertype } from 'src/app/base/base/base.component';
import { BaseUrl } from 'src/app/contracts/base_url';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';
import { List_Brand } from 'src/app/contracts/brand/list_brand';
import { List_Product } from 'src/app/contracts/list_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ConfigService } from 'src/app/services/common/config.service';
import { JqueryService } from 'src/app/services/common/jquery.service';
import { LanguageService } from 'src/app/services/common/language.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { BrandService } from 'src/app/services/common/models/brand.service';
import { CategoryService } from 'src/app/services/common/models/category.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CustomToastrService, TaostrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit, AfterViewInit {

  categories: any;

  constructor(private productService:ProductService,
    private activetadRoute: ActivatedRoute,
    private fileService: FileService,
    private basketService: BasketService,
    spinner: NgxSpinnerService,
    private customToastrService: CustomToastrService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private alertifyService: AlertifyService,
    private jqueryService: JqueryService,
    private configService: ConfigService) {
    super(spinner)
  }

  async ngAfterViewInit(){
    this.jqueryService.ngAfterViewInit();
  }

  currentBrand: string;
  currentCategory: string;
  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  baseUrl: BaseUrl;
  pageSize: number = 12;
  pageList: number[] = [];
  brands: { datas: List_Brand[] };
  private sevenDays: number;

  allProducts: List_Product[];
  brandProducts: List_Product[];
  async ngOnInit() {
    this.getCategories();
    this.baseUrl = await this.fileService.getBaseStorageUrl();
    this.activetadRoute.params.subscribe(
      async params => {
        this.currentBrand = params["brand"] ?? "0";
        this.currentCategory = params["category"] ?? "0";
        this.currentPageNo = parseInt(params["pageNo"] ?? "0");

        if (this.currentBrand == "0") {
            this.getProducts(this.currentCategory, this.currentPageNo);
        } else if (this.currentCategory == "0") {
            this.GetProductBrands(this.currentBrand, this.currentPageNo);
        }
      }
    );
    await this.getBands();
    this.configService.getConfig().subscribe((config) => {
      this.sevenDays = config.hotThreshold;
    });
  }

  async getBands(){
     this.brands = await this.brandService.getBrands(0, 5, () => this.HideSpinner(Spinnertype.BallAtom), errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }))
  }

  isHotProduct(createdDate: Date): boolean {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - this.sevenDays);

    const isHot = new Date(createdDate) >= sevenDaysAgo;
    return isHot;
  }

  async getProducts(currentCategory: string, currentPageNo: number){
    const data: {totalProductCount: number, products: List_Product[]} = await this.productService.read(null ,currentPageNo-1, this.pageSize, currentCategory, 
      ()=>{

      },
      errorMessage => {

      });
      this.allProducts = data.products;

      this.allProducts = this.allProducts.map<List_Product>(p => {
        this.fileService.getBaseStorageUrl().then(url => {
          
        })
        const listProduct : List_Product = {
          id: p.id,
          createDate: p.createDate,
          imagePath: p.productImageFiles.length > 0 ? p.productImageFiles.find(p=>p.path).path : "",
          name: p.name,
          price: p.price,
          stock: p.stock,
          updateDate: p.updateDate,
          productImageFiles: p.productImageFiles,
          commentCount: p.commentCount
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

  async GetProductBrands(currentBrand: string, currentPageNo: number){   
    const brandData : {totalProductCount: number, products: List_Product[]} = await this.productService.readByBrand(null, currentPageNo-1, this.pageSize, currentBrand,
      ()=>{

      },
      errorMessage => {

      } );
      this.brandProducts = brandData.products;

      this.brandProducts = this.brandProducts.map<List_Product>(p => {
        this.fileService.getBaseStorageUrl().then(url => {
          
        })
        const listProduct : List_Product = {
          id: p.id,
          createDate: p.createDate,
          imagePath: "",
          name: p.name,
          price: p.price,
          stock: p.stock,
          updateDate: p.updateDate,
          productImageFiles: p.productImageFiles,
          commentCount: p.commentCount
        }
        return listProduct;
      });

      this.totalProductCount = brandData.totalProductCount;
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