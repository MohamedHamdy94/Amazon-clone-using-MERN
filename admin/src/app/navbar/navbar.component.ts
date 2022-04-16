import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { Summary } from '../interfaces/summary';
import { AddProductService } from '../services/add-product.service';
import { LoaderService } from '../services/loader.service';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  allInfo: Summary = {
    orders: [{ numOrders: 0, totalSales: 0 }],
    productCategories: [{ _id: '', count: 0 }],
    users:[{_id: '',numUsers:0}],
  };


  constructor(
    private dialog: MatDialog,
    private api: AddProductService,
    private router: Router,
    private OrderApi: OrdersService,
    public loader : LoaderService,
  ) {
    // this.allInfo={
    //   orders:object[],
    // }
  }
  getAllProducts() {
    this.api.getProduct();
  }
  openDialog() {
    this.dialog
      .open(DialogComponent, { width: '30%' })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllProducts();
        }
      });
  }

  ngOnInit(): void {
    this.getAllinfo();
    // console.log(this.getAllinfo());
  }
  getAllinfo() {
    this.OrderApi.getInfo().subscribe({
      next: (res) => {
        console.log(res);
        console.log(res.productCategories);
        console.log(res.users[0]);
        console.log(res.orders);

        // orders: Array(1)
        // 0: {_id: null, numOrders: 5, totalSales: 97369}
        // length: 1
        // [[Prototype]]: Array(0)
        // productCategories: Array(1)
        // 0: {_id: 'laptop', count: 4}
        // length: 1
        // [[Prototype]]: Array(0)
        // users: Array(1)
        // 0: {_id: null, numUsers: 4}
        this.allInfo = res;
        console.log(this.allInfo);
      },
    });
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
