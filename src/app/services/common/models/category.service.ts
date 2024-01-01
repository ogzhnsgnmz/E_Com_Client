import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Category } from 'src/app/contracts/category/List_Category';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClientService: HttpClientService) { }

  async getAllCategories(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalOrderCount: number; orders: List_Category[] }> {
    const observable: Observable<{ totalOrderCount: number; orders: List_Category[] }> = this.httpClientService.get({
      controller: "categories",
      queryString: `page=${page}&size=${size}`
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack())
      .catch(error => errorCallBack(error));

    return await promiseData;
  }
}
