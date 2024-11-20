import { inject, Injectable } from '@angular/core';
import { ProductDTO } from '../DTOS/indexDTO';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://localhost:7161/api/Product/';
  http = inject(HttpClient);

  getProducts(page: number , numberOFProductsToDisplay: number) {
    return this.http.get<ProductDTO[]>(this.baseUrl+'GetProducts?page='+page+'&numberOFProductsToDisplay='+numberOFProductsToDisplay);    
  }
  getProductsOnSale(page: number , numberOFProductsToDisplay: number) {
    return this.http.get<ProductDTO[]>(this.baseUrl+'GetProductsIfOnSale?page='+page+'&numberOFProductsToDisplay='+numberOFProductsToDisplay);    
  }
  getProductsPromoted(page: number , numberOFProductsToDisplay: number) {
    return this.http.get<ProductDTO[]>(this.baseUrl+'GetProductsIfPromoted?page='+page+'&numberOFProductsToDisplay='+numberOFProductsToDisplay);    
  }
  getProductsByCategory(page: number ,category: string, numberOFProductsToDisplay: number) {
    return this.http.get<ProductDTO[]>(this.baseUrl+'GetProductsByCategory?category='+category+'&page='+page+'&numberOFProductsToDisplay='+numberOFProductsToDisplay);    
  }

  getProdByName(name: string) {
    return this.http.get<ProductDTO>(this.baseUrl+'GetProduct/'+name);    
  }
  getProdById(id: number) {
    return this.http.get<ProductDTO>(this.baseUrl+'GetProduct/'+id);    
  }
  createProduct(product: ProductDTO) {
    return this.http.post(this.baseUrl+'CreateProductAndStock',product,{
      headers: {
        Authorization: localStorage.getItem('tokenType')+' ' + localStorage.getItem('accessToken')
      }
    });
  }
  updateProduct(product: ProductDTO) {
    return this.http.post(this.baseUrl+'UpdateProduct',product,{
      headers: {
        Authorization: localStorage.getItem('tokenType')+' ' + localStorage.getItem('accessToken')
      }
    });
  }
  getProductRecommendation() {
    return this.http.get<ProductDTO[]>(this.baseUrl+'GetReccomendedProducts',{
      headers: {
        Authorization: localStorage.getItem('tokenType')+' ' + localStorage.getItem('accessToken')
      }
    });
  }
}
