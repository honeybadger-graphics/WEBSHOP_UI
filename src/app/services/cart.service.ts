import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AddToCartDTO, CartDTO} from '../DTOS/indexDTO';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = 'https://localhost:7161/api/Cart/';
    http = inject(HttpClient);
    
    creatCart(cart: CartDTO) {
      return this.http.post(this.baseUrl+'CreateCart', cart,{
        headers: {
          Authorization: localStorage.getItem('tokenType') + ' ' + localStorage.getItem('accessToken')
        },
      });    
    }
    addToCart(addToCart: AddToCartDTO) {
      return this.http.post(this.baseUrl+'AddToCart', addToCart,{
        headers: {
          Authorization: localStorage.getItem('tokenType') + ' ' + localStorage.getItem('accessToken')
        },
      });    
    }
    getCart() {
      return this.http.get<CartDTO>(this.baseUrl+'GetCart',{
        headers: {
          Authorization: localStorage.getItem('tokenType') + ' ' + localStorage.getItem('accessToken')
        },
      });    
    }
    updateCart(cart: CartDTO){
      return this.http.post(this.baseUrl+'UpdateCart', cart,{
        headers: {
          Authorization: localStorage.getItem('tokenType') + ' ' + localStorage.getItem('accessToken')
        },
      });    
    }
}
