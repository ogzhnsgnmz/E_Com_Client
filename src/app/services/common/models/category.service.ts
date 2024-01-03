import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClientService: HttpClientService) { }

  async getAllCategories(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<any> {
    const observable: Observable<any> = this.httpClientService.get({
      controller: "categories",
      queryString: `page=${page}&size=${size}`
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack())
      .catch(error => errorCallBack(error));

    return await promiseData;
  }

  async create(name: string, slug: string, successCallBack?: () => void, errorCallBack?: (error) => void) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "categories"
    }, { name: name, slug: slug });

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack)
      .catch(errorCallBack);

    return await promiseData as { succeeded: boolean };
  }
}
