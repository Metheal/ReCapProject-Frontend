import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css'],
})
export class BrandUpdateComponent implements OnInit {
  brand: Brand;
  brandUpdateForm: FormGroup;

  faTrash = faTrashAlt;

  constructor(
    private brandService: BrandService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
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
          this.toastrService.success(
            `Marka guncellendi: ${brandModel.brandName}`,
            'Basarili'
          );
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

  delete(): void {
    this.brandService.deleteBrand(this.brand).subscribe(
      () => {
        this.toastrService.success(
          `Marka silindi: ${this.brand.brandName}`,
          'Basarili'
        );
        document.getElementById('deleteBrand').click();
        this.router.navigate(['/cars']);
      },
      (responseError) => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(
              responseError.error.Errors[i].ErrorMessage,
              'Doğrulama hatası'
            );
          }
        }
      }
    );
  }

  getBrand(id: number) {
    this.brandService.getBrand(id).subscribe((response) => {
      this.brand = response.data;
      this.createBrandUpdateForm();
    });
  }
}
