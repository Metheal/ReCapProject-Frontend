import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { CarDto } from 'src/app/models/carDto';
import { Color } from 'src/app/models/color';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { BrandService } from 'src/app/services/brand.service';
import { Car } from 'src/app/models/car';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  carDto: CarDto;
  car: Car;
  brands: Brand[];
  colors: Color[];

  carUpdateForm: FormGroup;

  faTrash = faTrashAlt;

  constructor(
    private carService: CarService,
    private colorService: ColorService,
    private brandService: BrandService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCar(params['carID']);
    });
    this.getBrands();
    this.getColors();
  }

  createCarUpdateForm(): void {
    this.carUpdateForm = this.formBuilder.group({
      carID: [this.car.carID],
      carName: [this.car.carName, Validators.required],
      brandID: [this.car.brandID, Validators.required],
      colorID: [this.car.colorID, Validators.required],
      dailyPrice: [this.car.dailyPrice, Validators.required],
      modelYear: [this.car.modelYear, Validators.required],
      description: [this.car.description, Validators.required],
      findexScore: [
        this.car.findexScore,
        [Validators.required, Validators.min(0), Validators.max(1900)],
      ],
    });
  }

  getColors(): void {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getBrands(): void {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getCar(carID: number): void {
    this.carService.getCarByID(carID).subscribe((response) => {
      this.car = response.data;
      this.createCarUpdateForm();
    });
  }

  update(): void {
    if (this.carUpdateForm.valid) {
      const carModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.updateCar(carModel).subscribe(
        (response) => {
          this.toastrService.success('Arac guncellendi', 'Basarili');
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
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }

  delete(): void {
    this.carService.deleteCar(this.car).subscribe(
      (response) => {
        this.toastrService.success(
          `Arac silindi: ${this.car.carName}`,
          'Basarili'
        );
        document.getElementById('deleteCar').click();
        this.router.navigate(['/cars']);
      },
      (responseError) => {
        this.toastrService.error(responseError.error);
      }
    );
  }
}
