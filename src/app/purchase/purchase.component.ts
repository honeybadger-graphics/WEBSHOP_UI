import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseService } from '../services/purchase.service';
import { CartValueDTO } from '../DTOS/indexDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent implements OnInit {
 
  router = inject(Router);
  purchaseService = inject(PurchaseService);
  cartValue: CartValueDTO ={
    value: 0,
    currencyCode: ''
  }
  ngOnInit(): void {
    this.purchaseService.startPurchase().subscribe({
      next: (value) => {this.cartValue = value;},
      error: (err) => {
        console.error(err);
      }
    });
  }
  goToUserCart(){
  this.router.navigateByUrl('/user-cart');
  }
confirm(){
  console.log("confirm");
  this.purchaseService.confirmPurchase().subscribe({
    next: ()=> {this.ngOnInit(), console.log("confirmed")}

  });
  
}
}
