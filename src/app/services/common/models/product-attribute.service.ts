import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductAttributeService {

  constructor(private httpClientService: HttpClientService) { }

  async getAttributes(page: number, size: number, successCallBack?: () => void, errorCallBack?: (error) => void) {
    const observable: Observable<any> = this.httpClientService.get({
      controller: "ProductAttributes",
      queryString: `page=${page}&size=${size}`
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack)
      .catch(errorCallBack);

    return await promiseData;
  }

  async create(productId: string, value: string, successCallBack?: () => void, errorCallBack?: (error) => void) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "ProductAttributes"
    }, { Value: value, ProductId: productId });

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack)
      .catch(errorCallBack);

    return await promiseData as { succeeded: boolean };
  }
}
