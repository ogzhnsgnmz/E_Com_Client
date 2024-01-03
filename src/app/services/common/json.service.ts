import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor(private httpClient: HttpClient) { }

  async getjson(): Promise<any> {
    return this.httpClient.get('assets/jsonFile/const.json').toPromise();
  }
}
