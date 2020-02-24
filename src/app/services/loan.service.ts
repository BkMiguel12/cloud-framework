import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoanService {

  public url = 'https://api.bnext.io/partner_test/user';

  constructor(private http: HttpClient) { }

  getUser(id: string) {
    let params = {id: id};
    let headers = {'X-WEB-KEY': 'Development'};
    
    return this.http.get(this.url, {headers: headers, params: params}).toPromise();
  }

  sendLoan(payload: any, id: string) {
    let headers = {'X-WEB-KEY': 'Development'};
    payload['id'] = id;
    console.log(payload);

    return this.http.post(`${this.url}/${id}`, payload, {headers: headers}).toPromise();
  }
}
