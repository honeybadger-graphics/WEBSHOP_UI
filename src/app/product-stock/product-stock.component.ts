import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDTO, StockDTO } from '../DTOS/indexDTO';
import { StockService } from '../services/stock.service';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-stock',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product-stock.component.html',
  styleUrl: './product-stock.component.css'
})
export class ProductStockComponent {

  
    stockService = inject(StockService);
    productService = inject(ProductService)
    formInput = inject(FormBuilder);
     stock!: StockDTO;
     product!: ProductDTO;
    input = this.formInput.group({
     prodName: "",
    })
    find(_:any){
      const name = this.input.value.prodName as string;
      this.productService.getProdByName(name).subscribe({ next: (productResponse)=> {this.product = productResponse;
        const productId = this.product.productId as number;
     this.stockService.StockFinder(productId).subscribe({ next: stocksResponse => this.stock = stocksResponse,
       error: err => console.error(err)})
      }})
    
    }
   
}
