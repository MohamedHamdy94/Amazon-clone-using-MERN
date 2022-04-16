import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from './shared/auth.guard';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:"full"},
  {path:'login', component:LoginComponent },
  {path:'products', component:ProductsComponent ,canActivate:[AuthGuard] },
  {path:'orders', component:OrdersComponent,canActivate:[AuthGuard]  },
  {path:'users', component:UsersComponent,canActivate:[AuthGuard] },
  {path:'**', redirectTo:'login',pathMatch:"full"},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

