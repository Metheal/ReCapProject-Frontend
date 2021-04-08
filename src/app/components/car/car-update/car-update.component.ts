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
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private carService: CarService,
    private colorService: ColorService,
    private brandService: BrandService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
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
        (reponseError) => {
          this.toastrService.error(reponseError.error);
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }
}
