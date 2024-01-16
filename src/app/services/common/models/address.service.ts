import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClientService: HttpClientService) { }

  async getAddressByUserName(userName: string, page: number, size: number, successCallBack?: () => void, errorCallBack?: (error) => void) {
    const observable: Observable<any> = this.httpClientService.get({
      controller: `Addresses/${userName}?UserName=${userName}`
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack)
      .catch(errorCallBack);

    return await promiseData;
  }
}
