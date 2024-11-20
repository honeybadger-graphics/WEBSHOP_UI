import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
goToSpec(mode: string) {
  this.router.navigate(['/list-products', mode]);
}
  ngOnInit(): void {
    this.router.navigateByUrl('/list-products');
  }
  title = 'WEBSHOP_UI';
  router = inject(Router);
}
