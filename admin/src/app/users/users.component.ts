import { Component, OnInit } from '@angular/core';
import { AddProductService } from '../services/add-product.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Users } from '../interfaces/users';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  products: string[] = [
    'name',
    'email',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: UsersService,private dialog : MatDialog,private router:Router) {}

  ngOnInit(): void {

     this.getAllusers();


  }
  getAllusers() {
    this.api.getusers().subscribe({
      next: (res:Users[]) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);

        this.dataSource.paginator = this.paginator;

        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err.message);
        alert('error whil get all product');
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  delete(row:any) {
  this.api.deleteuser(row).subscribe(() =>{


  },(error) => {
        alert('Error user not deleted');
      }
      )
      window.location.reload() ;
    }
}

