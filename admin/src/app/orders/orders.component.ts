import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Orders } from '../interfaces/orders';
import { Users } from '../interfaces/users';

import { OrdersService } from '../services/orders.service';
import { UsersService } from '../services/users.service';
import { DailogService } from '../shared/dailog.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  // Orders: Orders;
  showOrder: any = ["name",'date', 'total','paid','delivered', 'details'
  // ,'deleted'
];
  // showOrder: Object[] = [{shippingAddress:{fullName:"name"},createdAt:'date',totalPrice: 'total',paidAt:'paid',isDelivered:'delivered', action:'action'}];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  order: Orders [ ]= [
    {
      orderItems: [
        {
          slug: '',
          name: '',
          quantity: '',
          image: '',
          price: 0,
          product: '',
        },
      ],
      shippingAddress: {
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
      },

      paymentResult: {
        _id: '',
        status: '',
        update_time: '',
        email_address: '',
      },
      paymentMethod: '',
      itemsPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 0,
      user: '',
      isPaid: false,
      paidAt: new Date(),
      isDelivered: false,
      delivered: new Date(),
      __v: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      _id: '',
    }]
  ;

  constructor(
    private userApi: UsersService,
    private api: OrdersService,
    private router: Router,
    private apiOrder: OrdersService,
    private dailogService:DailogService
  ) {}
  user: Users[] = [];

  ngOnInit(): void {
    this.getAllOrders();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // getAllinfo() {
  //   this.apiOrder.getInfo().subscribe({
  //     next: (res) => {
  //       console.log(res);

  //       // this.allInfo = res;
  //       // console.log(this.allInfo);
  //     },error: (err) => {
  //       console.log(err.message);
  //       alert('error whil get all order');
  //     },
  //   });
  // }
orderDitails(order:any){
  this.router.navigate(['order/'+order._id]);

}
  getAllOrders() {
    this.api.getOrders().subscribe({
      next: (res) => {
        this.order = res.order;
        this.dataSource = new MatTableDataSource( this.order);

        this.dataSource.paginator = this.paginator;

        this.dataSource.sort = this.sort;
        console.log(this.order);
      },
    });
  }

  // deleteOrder(order: any) {

  //   this.dailogService.openConfirmDialog("Are you sure to delete this Order ?").afterClosed().subscribe(res =>{
  //     console.log(res)
  //     if(res){
  //   this.api.deleteOrders(order).subscribe(
  //     (res) => {

  //     },
  //     (error) => {
  //       alert('Error Orders not deleted');
  //     }
  //   );
  //   window.location.reload();
  //     }
  //   })
  // }

  getUser(order: any) {
    this.userApi.userInfo(order).subscribe(
      (res) => {
        this.user = res;
        console.log(this.user);
        // console.log(this.user.name)
      },
      (error) => {
        // alert('Error user not found');
      }
    );
  }
}
