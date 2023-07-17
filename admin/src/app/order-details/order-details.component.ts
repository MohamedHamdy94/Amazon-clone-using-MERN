import { ActivatedRoute } from '@angular/router';
import { Order } from '../interfaces/order';
import { OrdersService } from '../services/orders.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Orders } from '../interfaces/orders';
import { Users } from '../interfaces/users';
import { UsersService } from '../services/users.service';
import { DailogService } from '../shared/dailog.service';
import { User } from '../interfaces/user';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  order: Order = {
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
    deliveredAt: new Date(),
    __v: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    _id: '',
  };

  user: User ={
    name :'',
      email :'',
      password :'',
      isAdmin:  false,
      createdAt:'',
      updatedAt:'',
      __v:0,
      // _id:ObjectId,
      _id:'',}
  //   {
  //     name :'',
  //     email :'',
  //     password :'',
  //     isAdmin:  false,
  //     createdAt:'',
  //     updatedAt:'',
  //     __v:0,
  //     // _id:ObjectId,
  //     _id:'',}
  //   }
  // ];

  constructor(
    private route: ActivatedRoute,
    private api: OrdersService,
    private userApi: UsersService,
    private router: Router,
    private dailogService: DailogService
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.getOrderbyId(id);
    this.getUser(this.order.user);
  }
  getOrderbyId(id: any) {
    this.api.getOrder(id).subscribe((res) => {
      console.log(res);

      this.order = res;

      this.getUser(this.order.user);

    });
  }

  // deleteOrder(order: any) {
  //   this.dailogService
  //     .openConfirmDialog('Are you sure to delete this Order ?')
  //     .afterClosed()
  //     .subscribe((res) => {
  //       console.log(res);
  //       if (res) {
  //         this.api.deleteOrders(order).subscribe(
  //           (res) => {},
  //           (error) => {
  //             alert('Error Orders not deleted');
  //           }
  //         );
  //         window.location.reload();
  //       }
  //     });
  // }

  delivered(order: any) {
    this.api.deliverd(order).subscribe(
      (res) => {
        window.location.reload();
      },
      (error) => {
        alert('Error Orders not deleted');
      }
    );
  }

  notDelivered(order: any) {
    this.api.notDeliverd(order).subscribe(
      (res) => {
        window.location.reload();
      },
      (error) => {
        alert('Error Orders not deleted');
      }
    );
  }

  getUser(order: any) {
    console.log(order);
    this.userApi.userInfo(order).subscribe(
      (res) => {
        console.log(res);

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
