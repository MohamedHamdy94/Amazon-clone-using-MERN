import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import { MatConfirmDialogComponent } from '../mat-confirm-dialog/mat-confirm-dialog.component';
@Injectable({
  providedIn: 'root'
})
export class DailogService {

  constructor(private dailog :MatDialog) { }
  openConfirmDialog(msg:any){
  return  this.dailog.open(MatConfirmDialogComponent,{
      width: '390px',
      disableClose:true,
      data:{
        message:msg
      }
    })
  }
}
