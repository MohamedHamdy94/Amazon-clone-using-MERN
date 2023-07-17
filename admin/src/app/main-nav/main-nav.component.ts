import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AddProductService } from '../services/add-product.service';
import { Router } from '@angular/router';
import { OrdersService } from '../services/orders.service';
import { LoaderService } from '../services/loader.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Summary } from '../interfaces/summary';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    allInfo: Summary = {
      orders: [{ numOrders: 0, totalSales: 0 }],
      productCategories: [{ _id: '', count: 0 }],
      users:[{_id: '',numUsers:0}] ,
      products:[{ _id: '', numProducts: 0 }],

    };

  constructor(private breakpointObserver: BreakpointObserver,
        private dialog: MatDialog,
    private api: AddProductService,
    private router: Router,
    private OrderApi: OrdersService,
    public loader : LoaderService,) {}


    ngOnInit(): void {
      this.getAllinfo();
      console.log(this.getAllinfo());
    }
    getAllinfo() {
      this.OrderApi.getInfo().subscribe({
        next: (res) => {
          console.log(res);

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
        error: (err) => {
          console.log(err);
          alert('error whil get summary');
        },
      });
    }

openDialog() {
  this.dialog
    .open(DialogComponent, { width: '30%' })
    .afterClosed()
    .subscribe((val) => {
      if (val === 'save') {
      }
    });
}

logout() {
  localStorage.removeItem('token');
  this.router.navigate(['login']);
}
}
