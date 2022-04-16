import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Orders } from '../interfaces/orders';
import { Users } from '../interfaces/users';

import { OrdersService } from '../services/orders.service';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  // Orders: Orders;
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
        fullname: '',
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
    private apiOrder: OrdersService
  ) {}
  user: Users[] = [];

  ngOnInit(): void {
    this.getAllOrders();
    this.getAllinfo();
  }
  getAllinfo() {
    this.apiOrder.getInfo().subscribe({
      next: (res) => {
        console.log(res);
        // this.allInfo = res;
        // console.log(this.allInfo);
      },
    });
  }

  getAllOrders() {
    this.api.getOrders().subscribe({
      next: (res) => {
        this.order = res.order;
        console.log(this.order);
      },
    });
  }

  deleteOrder(order: any) {
    this.api.deleteOrders(order).subscribe(
      (res) => this.getAllOrders(),
      (error) => {
        alert('Error Orders not deleted');
      }
    );
    window.location.reload();
  }

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
