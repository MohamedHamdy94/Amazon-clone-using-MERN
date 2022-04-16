import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddProductService } from '../services/add-product.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  actionButn: string = 'save';
  protectForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private api: AddProductService,
    @Inject(MAT_DIALOG_DATA) public editData: any, // عشان استلم الداتا في الديلوج هعمل انجيكت ل
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}
  ngOnInit(): void {
    this.protectForm = this.fb.group({
      name: ['', Validators.required],
      slug: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', Validators.required],
      countInStock: ['', Validators.required],
      brand: ['', Validators.required],
      rating: ['', Validators.required],
      numReviews: ['', Validators.required],
      description: ['', Validators.required],
    });

    console.log(this.editData);

    if (this.editData) {
      this.actionButn = 'Update';
      this.protectForm.controls['name'].setValue(this.editData.name);
      this.protectForm.controls['slug'].setValue(this.editData.slug);
      this.protectForm.controls['category'].setValue(this.editData.category);
      this.protectForm.controls['image'].setValue(this.editData.image);
      this.protectForm.controls['price'].setValue(this.editData.price);
      this.protectForm.controls['countInStock'].setValue(
        this.editData.countInStock
      );
      this.protectForm.controls['brand'].setValue(this.editData.brand);
      this.protectForm.controls['rating'].setValue(this.editData.rating);
      this.protectForm.controls['numReviews'].setValue(
        this.editData.numReviews
      );
      this.protectForm.controls['description'].setValue(
        this.editData.description
      );
    }
  }

  
  addProduct() {
    console.log(this.protectForm.value);
    if (!this.editData) {
      if (this.protectForm.valid) {
        this.api.postProduct(this.protectForm.value).subscribe( (res) => {
            this.protectForm.reset();
            this.dialogRef.close('save');
          },
          (error) => {
            alert('Error Product not add');
          },
        );
      }
    } else {
      this.updateProduct();
    }
    window.location.reload() ;

  }

  updateProduct() {
    console.log(this.protectForm.value);
    this.api
      .putProduct(this.protectForm.value, this.editData._id)
      .subscribe((res) => {
        this.protectForm.reset();
        this.dialogRef.close('update');
        window.location.reload() ;
      });

  }
}
