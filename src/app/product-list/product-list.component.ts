import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AddToCartDTO, ProductDTO } from '../DTOS/indexDTO';
import { Subscription } from 'rxjs';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements
  OnInit, OnDestroy {
    activatedRoute = inject(ActivatedRoute);
    productService = inject(ProductService);
    cartService = inject(CartService);
    private productSubscription = new Subscription;
    router = inject(Router);
    page = 1;
    display = 10;
    catergory = "";
    categorySwitch: boolean = false;
    productRecommend: ProductDTO[] = [];
    products: ProductDTO[] = [];
    cart: AddToCartDTO = {
      productId: 0,
      productCount: 0
    }
    ngOnInit(): void {
      this.activatedRoute.params.subscribe(
        (params:Params)=>{
            console.log(params['mode']);
            this.loadData(params['mode']);
        }
      )
      this.productService.getProductRecommendation().subscribe({ next: (products) => (this.productRecommend = products),
        error: (err) => console.error(err),})
    }
    addToCart(id: number){
      console.log(id);
      this.cart.productId = id;
      this.cart.productCount = 1;
      this.cartService.addToCart(this.cart).subscribe();
    }
    nextPage(_:any){
      this.page = this.page+1;
      this.ngOnInit();
    }
    prevPage(_:any) {
      if(this.page !== 1){
        this.page = this.page-1;
      }
      this.ngOnInit();
      
    }
    onSelectedForDisplay(value: string): void {
      this.display = parseInt(value);
      //console.log(this.display);
      this.ngOnInit();
    }
    onSelectedForCategory(value: string): void {
      this.catergory = value;
      //console.log(this.display);
      this.ngOnInit();
    }
    ngOnDestroy(): void {
      this.productSubscription.unsubscribe();
    }
    loadData(mode: string) {
      switch(mode){
        case "categories":
          this.categorySwitch= true;
          this.productSubscription=this.productService.getProductsByCategory(this.page,this.catergory,this.display).subscribe({
            next: (products) => (this.products = products),
            error: (err) => console.error(err),
          });
          break;
        case "sales":
          this.categorySwitch= false;
          this.productSubscription=this.productService.getProductsOnSale(this.page,this.display).subscribe({
            next: (products) => (this.products = products),
            error: (err) => console.error(err),
          });
          break;
        case "promoted":
          this.categorySwitch= false;
          this.productSubscription=this.productService.getProductsPromoted(this.page,this.display).subscribe({
            next: (products) => (this.products = products),
            error: (err) => console.error(err),
          });
          break;
        default:
          this.categorySwitch= false;
          this.productSubscription=this.productService.getProducts(this.page,this.display).subscribe({
            next: (products) => (this.products = products),
            error: (err) => console.error(err),
          });
          break;
      }
    }
  }



