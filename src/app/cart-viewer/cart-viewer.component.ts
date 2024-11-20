import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartDTO } from '../DTOS/indexDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-viewer.component.html',
  styleUrl: './cart-viewer.component.css'
})
export class CartViewerComponent implements OnInit{
 emptyNumberArray: number[] = [];
  cartService = inject(CartService);
  cart :CartDTO ={ cartId: "",
    productIds:  this.emptyNumberArray,
    productCount: this.emptyNumberArray
  }
  
  ngOnInit(): void {
   this.cartService.getCart().subscribe({
    next: (cart) => (this.cart = cart),
    error: (err) => console.error(err),
  });
  }
  removeProduct(index: number): void {
if (index > -1) {
   this.cart.productIds.splice(index, 1);
   this.cart.productCount.splice(index, 1);
}
//console.log(this.cart)
this.cartService.updateCart(this.cart).subscribe();
  }
  modifyCount(index: number, countchange: number): void {
    if (index > -1) {
       
       this.cart.productCount[index] += countchange
    }
    //console.log(this.cart)
    this.cartService.updateCart(this.cart).subscribe();
      }
  
}
