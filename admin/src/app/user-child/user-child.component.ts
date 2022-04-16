import { Component, OnInit ,Input} from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-child',
  templateUrl: './user-child.component.html',
  styleUrls: ['./user-child.component.scss']
})
export class UserChildComponent implements OnInit {
@Input() order: any
user :any;
  constructor(private userApi : UsersService ,private router:Router) { }

  ngOnInit(): void {
  }
  getUser(order:any){

  this.userApi.userInfo(order).subscribe((res) => {
    this.user = res
    console.log(this.user)
           console.log(this.user.name)

 }, (error) => {
   // alert('Error user not found');
 })}
}
