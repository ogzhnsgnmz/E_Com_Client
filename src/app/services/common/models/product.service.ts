import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { Create_Product } from 'src/app/contracts/create_product';
import { List_Product } from 'src/app/contracts/list_product';
import { List_Product_Image } from 'src/app/contracts/list_product_image';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) { }

  create(Product: Create_Product, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void){
    Product.slug = Product.name.toUpperCase();
    this.httpClientService.post({
      controller: "products"
    },Product).subscribe(result =>{
      successCallBack();
    }, (errorResponse: HttpErrorResponse) => {
      const _error: Array<{key: string,value: Array<string>}> = errorResponse.error;
      let message = "";
      _error.forEach((v, index) => {
        v.value.forEach((_v, _index)=>{
          message += `${_v}<br>`;
        });
      });
      errorCallBack(message);
    });
  }

  /*
  async read(page: Number = 0,size: Number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{totalCount: number; Products: List_Product[]}>{
    const promiseData: Promise<{totalCount: number; Products: List_Product[]}> = this.httpClientService.get<{totalCount: number; Products: List_Product[]}>({
      controller:"Products",
      queryString:`page=${page}&size=${size}`
    }).toPromise();
    debugger;
    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  } */

  async readByBrand(id: string, page: number = 0, size: number = 5, brand: string, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalProductCount: number; products: List_Product[] }> {
    try {
      const url = id ? `products/${id}` : 'products';
      const queryString = brand ? `page=${page}&size=${size}&brand=${brand}` : `page=${page}&size=${size}`;

      const response: Observable<{ totalProductCount: number; products: List_Product[] }> = this.httpClientService.get<{ totalProductCount: number; products: List_Product[] }>({
        controller: url,
        action : "GetProductBrands",
        queryString: queryString
      });
  
      // Eğer başarı durumunda successCallBack parametresi verilmişse çağır.
      if (this.isSuccessCallbackProvided(successCallBack)) {
        successCallBack();
      }
  
      // Observable'ın içindeki değeri bekleyin
      const responseData = await response.toPromise();
  
      return responseData;
    } catch (errorResponse) {
      // Hata durumunda errorCallBack parametresi verilmişse çağır.
      if (this.isErrorCallbackProvided(errorCallBack)) {
        errorCallBack(errorResponse.message);
      }
  
      // Hata durumunda Promise.reject kullanarak hata zincirini yakalayın.
      return Promise.reject(errorResponse);
    }
  }

  async read(id: string, page: number = 0, size: number = 5, category: string, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalProductCount: number; products: List_Product[] }> {
    try {
      const url = id ? `products/${id}` : 'products';
      const queryString = category ? `page=${page}&size=${size}&category=${category}&productId=${id}` : `page=${page}&size=${size}&productId=${id}`;

      const response: Observable<{ totalProductCount: number; products: List_Product[] }> = this.httpClientService.get<{ totalProductCount: number; products: List_Product[] }>({
        controller: url,
        action: "GetProducts",
        queryString: queryString
      });
  
      // Eğer başarı durumunda successCallBack parametresi verilmişse çağır.
      if (this.isSuccessCallbackProvided(successCallBack)) {
        successCallBack();
      }
  
      // Observable'ın içindeki değeri bekleyin
      const responseData = await response.toPromise();
  
      return responseData;
    } catch (errorResponse) {
      // Hata durumunda errorCallBack parametresi verilmişse çağır.
      if (this.isErrorCallbackProvided(errorCallBack)) {
        errorCallBack(errorResponse.message);
      }
  
      // Hata durumunda Promise.reject kullanarak hata zincirini yakalayın.
      return Promise.reject(errorResponse);
    }
  }

  async readById(id: string, page: number = 0, size: number = 5, category: string, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<any> {
    try {
        const queryString = category ? `page=${page}&size=${size}&category=${category}` : `page=${page}&size=${size}`;

        const response: Observable<any> = this.httpClientService.get<any>({
            controller: "products",
            action: id,
            queryString: queryString
        });
        if (this.isSuccessCallbackProvided(successCallBack)) {
            successCallBack();
        }
        const responseData = await response.toPromise();
        return responseData;
    } catch (errorResponse) {
        if (this.isErrorCallbackProvided(errorCallBack)) {
            errorCallBack(errorResponse.message);
        }
        return Promise.reject(errorResponse);
  }
}

  
  // successCallBack parametresi verilmişse true döner.
  private isSuccessCallbackProvided(callback: any): callback is () => void {
    return typeof callback === 'function';
  }
  
  // errorCallBack parametresi verilmişse true döner.
  private isErrorCallbackProvided(callback: any): callback is (errorMessage: string) => void {
    return typeof callback === 'function';
  }
  
  async delete(id: string) {
    const deleteObservable: Observable<any> = this.httpClientService.delete({
      controller: "products"
    }, id);

    await firstValueFrom(deleteObservable);
  }

  async readImage(id: string, successCallBack?: () => void):Promise<List_Product_Image[]>{
    const getObservable : Observable<List_Product_Image[]> = this.httpClientService.get<List_Product_Image[]>({
      action: "getProductimages",
      controller : "products"
    }, id);
    const images: List_Product_Image[] = await firstValueFrom(getObservable);
    if (this.isSuccessCallbackProvided(successCallBack)) {
      successCallBack();
    }
    return images;
  }

  async deleteImage(id: string, imageId: string, successCallBack?: () => void) {
    const deleteObservable = this.httpClientService.delete({
      action: "deleteproductimage",
      controller: "products",
      queryString: `imageId=${imageId}`
    }, id)
    await firstValueFrom(deleteObservable);
    successCallBack();
  }

  async changeShowcaseImage(imageId: string, productId: string, successCallBack?: () => void): Promise<void> {
    const changeShowcaseImageObservable = this.httpClientService.get({
      controller: "products",
      action: "ChangeShowcaseImage",
      queryString: `imageId=${imageId}&productId=${productId}`
    });
    await firstValueFrom(changeShowcaseImageObservable);
    successCallBack();
  }

  async updateStockQrCodeToProduct(productId: string, stock: number, successCallBack?: () => void) {
    const observable = this.httpClientService.put({
      action: "qrcode",
      controller: "products"
    }, {
      productId, stock
    });

    await firstValueFrom(observable);
    successCallBack();
  }
} 