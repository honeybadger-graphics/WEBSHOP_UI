import { Component } from '@angular/core';
import { ProductDTO } from '../DTOS/indexDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-read',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-read.component.html',
  styleUrl: './product-read.component.css'
})
export class ProductReadComponent {
product: ProductDTO ={
  productId: 0,
  productName: '',
  productDescription: [],
  productCategory: '',
  productImage: '',
  productPrice: 0,
  productBasePrice: 0,
  isProductPromoted: false,
  isProductOnSale: false
}
}
