import { Component, OnInit } from '@angular/core';
import { AddProductService } from '../services/add-product.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { OrdersService } from '../services/orders.service';
import { Products } from '../interfaces/products';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  allInfo: any;
  products: string[]  = [
    'image',
    'name',
    'slug',
    'brand',
    'category',
    'description',
    'price',
    'countInStock',
    'rating',
    'numReviews',
    'action',
  ]  ;
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private api: AddProductService,
    private dialog: MatDialog,
    private router: Router,
    private auth: AuthService,
    private apiOrder: OrdersService
  ) {}

  ngOnInit(): void {
    // console.log(this.auth.IsLogin().token);

    this.getAllProducts();
    this.getAllinfo()
  }

getAllinfo() {
  this.apiOrder.getInfo().subscribe({
    next: (res) => {
      console.log(res);
      this.allInfo = res;
      console.log(this.allInfo);
    },
  });
}


  getAllProducts() {
    this.api.getProduct().subscribe({
      next: (res:Products[]) => {
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

  editProduct(row: any) {
    this.dialog
      .open(DialogComponent, {
        width: '50%',
        data: row, ///هبعت الداتا للديلوج اللي في ال
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          // this.getAllProducts();
          window.location.reload() ;

        }
      });
  }

  delete(row: any) {
    this.api.deleteProduct(row).subscribe(

      (error) => {
        alert('Error Product not deleted');
      }
    );

    window.location.reload() ;
  }
}
