import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StockDTO, StockUpdateDTO } from '../DTOS/indexDTO';


@Injectable({
  providedIn: 'root'
})
export class StockService {

  private baseUrl = 'https://localhost:7161/api/Stocks/';
    http = inject(HttpClient);
    
    LowStockFinder(compereTo: number) {
      return this.http.get<StockDTO[]>(this.baseUrl+'GetLowStocks/'+compereTo,{
        headers: {
          Authorization: localStorage.getItem('tokenType') + ' ' + localStorage.getItem('accessToken')
        },
      });    
    }
    StockFinder(productId: number) {
      return this.http.get<StockDTO>(this.baseUrl+'GetStockByProductId/'+productId ,{
        headers: {
          Authorization: localStorage.getItem('tokenType') + ' ' + localStorage.getItem('accessToken')
        },
      });
    }
    StockUpdate(stockUpdate: StockUpdateDTO) {
      return this.http.post(this.baseUrl+'UpdateStock', stockUpdate ,{
        headers: {
          Authorization: localStorage.getItem('tokenType') + ' ' + localStorage.getItem('accessToken')
        },
      });  
    }  
}
