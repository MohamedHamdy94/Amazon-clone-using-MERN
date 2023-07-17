import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-user-child',
  templateUrl: './user-child.component.html',
  styleUrls: ['./user-child.component.scss'],
})
export class UserChildComponent implements OnInit {
  @Input() order: any;
  user: any;
  constructor(
    private userApi: UsersService,
    private router: Router,
    private apiOrder: OrdersService
  ) {}

  ngOnInit(): void {}
  deliverd(order: any) {
    this.apiOrder.deliverd(order).subscribe(
      (res) => {  
          window.location.reload();

      },
      (error) => {
        console.log(error);
      }
    );
    // window.location.reload();
  }

  notDeliverd(order: any) {
    this.apiOrder.notDeliverd(order).subscribe(
      (res) => {
       window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getUser(order: any) {
    this.userApi.userInfo(order).subscribe(
      (res) => {
        this.user = res;
        console.log(this.user);
        console.log(this.user.name);
      },
      (error) => {
        // alert('Error user not found');
      }
    );
  }
}
