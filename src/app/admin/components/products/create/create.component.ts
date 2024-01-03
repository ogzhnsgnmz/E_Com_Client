import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, Spinnertype } from 'src/app/base/base/base.component';
import { List_Attribute } from 'src/app/contracts/attribute/List_Attribute';
import { List_Brand } from 'src/app/contracts/brand/list_brand';
import { List_Category } from 'src/app/contracts/category/list_category';
import { Create_Product } from 'src/app/contracts/create_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { AttributeService } from 'src/app/services/common/models/attribute.service';
import { BrandService } from 'src/app/services/common/models/brand.service';
import { CategoryService } from 'src/app/services/common/models/category.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {
  
  constructor(
    private alertifyService: AlertifyService,
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertify: AlertifyService,
    private categoryService: CategoryService,
    private attributeService: AttributeService,
    private brandService: BrandService) {
    super(spinner)
  }
  ngOnInit(): void {
    this.getAttributes();
    this.getBrands();
    this.getCategories();
  }

  @Output() createdProduct : EventEmitter<Create_Product> = new EventEmitter();
  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action: "upload",
    controller: "products",
    explanation: "Resimleri sürükleyin veya seçin...",
    isAdminPage: true,
    accept: ".png, .jpg, .jpeg"
  }; 

  selectedCategory = 'None';
  categoryDataSource: MatTableDataSource<List_Category> = new MatTableDataSource<List_Category>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  async getCategories() {
    this.ShowSpinner(Spinnertype.BallAtom);
    const allLists: { datas: List_Category[], totalCount: number } = await this.categoryService.getAllCategories(
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5,
      () => this.HideSpinner(Spinnertype.BallAtom),
      errorMessage => this.alertifyService.message(errorMessage, {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      })
    );
  
    this.categoryDataSource = new MatTableDataSource<List_Category>(allLists.datas);
  }

  selectedAttribute = 'xs';
  attributeDataSource: MatTableDataSource<List_Attribute> = new MatTableDataSource<List_Attribute>();
  
  async getAttributes() {
    this.ShowSpinner(Spinnertype.BallAtom);
    const allAttributes: { datas: List_Attribute[], totalCount: number } = await this.attributeService.getAttributes(
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5,
      () => this.HideSpinner(Spinnertype.BallAtom),
      errorMessage => this.alertifyService.message(errorMessage, {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      })
    );
  
    this.attributeDataSource = new MatTableDataSource<List_Attribute>(allAttributes.datas);
  }

  selectedBrand = 'E-Com';
  brandDataSource: MatTableDataSource<List_Brand> = new MatTableDataSource<List_Brand>();
  
  async getBrands() {
    this.ShowSpinner(Spinnertype.BallAtom);
    const allBrands: { datas: List_Brand[], totalCount: number } = await this.brandService.getBrands(
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5,
      () => this.HideSpinner(Spinnertype.BallAtom),
      errorMessage => this.alertifyService.message(errorMessage, {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      })
    );
  
    this.brandDataSource = new MatTableDataSource<List_Brand>(allBrands.datas);
  }

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement, attribute: HTMLInputElement, attributeValue: HTMLInputElement, brand: HTMLInputElement, category: HTMLInputElement, description: HTMLInputElement){
    this.ShowSpinner(Spinnertype.BallAtom);
    const create_Product: Create_Product = new Create_Product();
    create_Product.name = name.value;
    create_Product.stock = stock.value;
    create_Product.price = price.value;
    create_Product.attribute = attribute.value;
    create_Product.attributeValue = attributeValue.value;
    create_Product.brand = brand.value;
    create_Product.category = category.value;
    create_Product.description = description.value;

    this.productService.create(create_Product, () => {
      this.HideSpinner(Spinnertype.BallAtom);
      this.alertify.message("Ürün başarıyla eklenmiştir",{
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.createdProduct.emit(create_Product);
    }, errorMessage => {
      this.alertify.message(errorMessage,
        {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
    });
  }
}
