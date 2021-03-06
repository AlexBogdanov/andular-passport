import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  productForm: FormGroup;
  prod_name: string = '';
  prod_desc: string = '';
  prod_price: number = null;
  updated_at: Date = null;
  isLoadingResults = false;

  constructor(private router: Router, private apiService: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'prod_name': [null, Validators.required],
      'prod_desc': [null, Validators.required],
      'prod_price': [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.apiService.addProduct(form)
      .subscribe(res => {
        let id = res._id;
        this.isLoadingResults = false;
        this.router.navigate(['/product-details/', id]);
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
}
