import { Component, inject} from '@angular/core';
import { StockService } from '../services/stock.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StockDTO } from '../DTOS/indexDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-low-stock-finder',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './low-stock-finder.component.html',
  styleUrl: './low-stock-finder.component.css'
})
export class LowStockFinderComponent {
 stockService = inject(StockService);
 formInput = inject(FormBuilder);
  stocks: StockDTO[]= [];
 input = this.formInput.group({
  stockToComperTo: 10,
 })
 find(_:any){
 const compereTo = this.input.value.stockToComperTo as number;
  this.stockService.LowStockFinder(compereTo).subscribe({ next: stocksResponse => this.stocks = stocksResponse,
    error: err => console.error(err)})
 }
}
