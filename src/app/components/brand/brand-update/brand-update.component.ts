import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css'],
})
export class BrandUpdateComponent implements OnInit {
  brand: Brand;

  brandUpdateForm: FormGroup;
  constructor(
    private brandService: BrandService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getBrand(params['brandID']);
    });
  }

  createBrandUpdateForm(): void {
    this.brandUpdateForm = this.formBuilder.group({
      brandID: [this.brand.brandID],
      brandName: [this.brand.brandName, Validators.required],
    });
  }

  update() {
    if (this.brandUpdateForm.valid) {
      const brandModel = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.updateBrand(brandModel).subscribe(
        (response) => {
          this.toastrService.success('Marka Guncellendi', 'Basarili');
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Dogrulama hatasi'
              );
            }
          }
        }
      );
    }
  }

  getBrand(id: number) {
    this.brandService.getBrand(id).subscribe((response) => {
      this.brand = response.data;
      this.createBrandUpdateForm();
    });
  }
}
