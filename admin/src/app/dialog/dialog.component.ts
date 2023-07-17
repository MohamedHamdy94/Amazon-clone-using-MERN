import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddProductService } from '../services/add-product.service';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { DailogService } from '../shared/dailog.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  actionButn: string = 'save';
  protectForm!: FormGroup;
  imageData: any;
  matcher = new MyErrorStateMatcher();

  constructor(
    private dailogService: DailogService,

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
      image: [
        null,
        [
          Validators.required,
          //  Validators.pattern(/^\w+(\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF))$/)
          // Validators.pattern(/^[a-zA-Z0-9_]+(\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF))$/)
        ],
      ],
      price: ['', Validators.required],
      countInStock: ['', Validators.required],
      brand: ['', Validators.required],
      // rating: [null, [Validators.required, Validators.max(5)]],
      //  numReviews: ['', Validators.required] ,
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
      // this.protectForm.controls['rating'].setValue(this.editData.rating);
      // this.protectForm.controls['numReviews'].setValue(
      //   this.editData.numReviews
      // );
      this.protectForm.controls['description'].setValue(
        this.editData.description
      );
    }
  }

  onFileSelect(event: any) {
    this.imageData = null;
    const file: any = event.target.files[0];
    this.protectForm.patchValue({ image: file });
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg','image/gif', 'image/JPG', 'image/JPEG', 'image/PNG', 'image/GIF'];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }else{
      this.protectForm.controls['image'].reset();

      this.dailogService
      .openConfirmDialog("Please choose an image")

    }
    console.log(file);
  }

  get formControls() {
    return this.protectForm.controls;
  }

  addProduct() {
    console.log(this.protectForm.value);
    if (!this.editData) {
      if (this.protectForm.valid) {

        const imgFil: File = this.protectForm.get('image')?.value._files[0];
        console.log(File);
        this.api.postProduct(this.protectForm.value, imgFil).subscribe(
          (res) => {
            this.protectForm.reset();
            this.dialogRef.close('save');
            window.location.reload();
            this.imageData = null;

          },
          (error) => {
            console.log(error);
            alert('Error Product not add');
          }
        );
      } else {
        this.dailogService
        .openConfirmDialog("form not valid")
      }
    } else {
      this.updateProduct();
    }
  }


  updateProduct() {
    console.log(this.protectForm.value);
    if (this.protectForm.valid) {
      const imgFil: File = this.protectForm.get('image')?.value._files[0];
      console.log(imgFil);

      this.api
        .putProduct(this.protectForm.value, this.editData, imgFil)
        .subscribe((res) => {
          this.protectForm.reset();
          this.dialogRef.close('update');
          window.location.reload();
        });
    } else {
      this.dailogService
      .openConfirmDialog("form not valid")
    }
  }
}
