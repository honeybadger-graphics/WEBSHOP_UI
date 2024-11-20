import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { FirstRegisterComponent } from './first-register/first-register.component';
import { LoginComponent } from './login/login.component';
import { CartViewerComponent } from './cart-viewer/cart-viewer.component';
import { ReadModifyUserDataComponent } from './read-modify-user-data/read-modify-user-data.component';
import { LowStockFinderComponent } from './low-stock-finder/low-stock-finder.component';
import { ProductStockComponent } from './product-stock/product-stock.component';
import { ModifyStockComponent } from './modify-stock/modify-stock.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { ProductReadComponent } from './product-read/product-read.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { ProductFormComponent } from './product-form/product-form.component';

export const routes: Routes = [
    {
      path: 'list-products',
      component: ProductListComponent,
    },
    {
      path: 'list-products/:mode',
      component: ProductListComponent,
    },
    {
      path: 'list-products/:mode',
      component: ProductListComponent,
    },
    {
      path: 'list-products/:mode',
      component: ProductListComponent,
    },
   {
      path: 'register',
      component: RegisterFormComponent,
    },
    {
      path: 'new-register',
      component: FirstRegisterComponent,
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'user-data',
      component: ReadModifyUserDataComponent,
    },
    {
      path: 'user-cart',
      component: CartViewerComponent,
    },
    {
      path: 'low-stock',
      component: LowStockFinderComponent,
    },
    {
      path: 'search-stock',
      component: ProductStockComponent,
    },
    {
      path: 'modify-stock',
      component: ModifyStockComponent,
    },
    {
      path: 'add-admin',
      component: AddAdminComponent,
    },
    {
      path: 'product-read',
      component: ProductReadComponent,
    },
    {
      path: 'purchase',
      component: PurchaseComponent,
    },
    {
      path: 'product-form',
      component: ProductFormComponent,
    },
    {
      path: 'product-read/:name',
      component: ProductReadComponent,
    },

  ];
