import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDto } from 'src/app/models/carDto';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
  providers: [CarService],
})
export class CarDetailComponent implements OnInit {

  car: CarDto;
  imageUrl = environment.apiURL;
  dataLoaded = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCarDtoByID(params['carID']);
    });
  }

  getCarDtoByID(carID: number): void {
    this.carService.getCarDtoByID(carID).subscribe((response) => {
      this.car = response.data;
      this.dataLoaded = true;
    });
  }
}
