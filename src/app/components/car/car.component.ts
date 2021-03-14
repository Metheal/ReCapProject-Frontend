import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDto } from 'src/app/models/carDto';
import { environment } from 'src/environments/environment';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
  providers: [CarService],
})
export class CarComponent implements OnInit {
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  title = 'Araclar';
  cars: Car[];
  carsDto: CarDto[];
  message: string;
  success: boolean;
  dataLoaded = false;
  imageUrl: string = environment.apiURL;
  filterText = '';

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['color']) {
        this.getCarDetailsByColorName(params['color']);
      }
      if (params['brand']) {
        this.getCarDetailsByBrandName(params['brand']);
      } else {
        this.getCarDetails();
      }
    });
  }

  getCars(): void {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.message = response.message;
      this.success = response.success;
      this.dataLoaded = true;
    });
  }

  getCarDetails(): void {
    this.carService.getCarDetails().subscribe((response) => {
      this.carsDto = response.data;
      this.message = response.message;
      this.success = response.success;
      this.dataLoaded = true;
    });
  }

  getCarsByCategory(categoryID: number): void {
    this.carService.getCarDetails().subscribe((response) => {
      this.carsDto = response.data;
      this.message = response.message;
      this.success = response.success;
      this.dataLoaded = true;
    });
  }

  getCarDetailsByColorName(colorName: string): void {
    this.carService
      .getCarDetailsByColorName(colorName)
      .subscribe((response) => {
        this.carsDto = response.data;
        this.message = response.message;
        this.success = response.success;
        this.dataLoaded = true;
      });
  }

  getCarDetailsByBrandName(brandName: string): void {
    this.carService
      .getCarDetailsByBrandName(brandName)
      .subscribe((response) => {
        this.carsDto = response.data;
        this.message = response.message;
        this.success = response.success;
        this.dataLoaded = true;
      });
  }
}
