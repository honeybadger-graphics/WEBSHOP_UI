import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CartValueDTO } from '../DTOS/indexDTO';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private baseUrl = 'https://localhost:7161/api/Purchase/';
  http = inject(HttpClient);   
  startPurchase() {
    return this.http.post<CartValueDTO>(this.baseUrl+'StartPurchase',null,{
      headers: {
        Authorization: localStorage.getItem('tokenType')+' ' + localStorage.getItem('accessToken')
      }
    });    
  }
    confirmPurchase() {
      return this.http.post(this.baseUrl+'ConfirmPurchase',null,{
        headers: {
          Authorization: localStorage.getItem('tokenType')+' ' + localStorage.getItem('accessToken')
        }
      });    
    }
}
