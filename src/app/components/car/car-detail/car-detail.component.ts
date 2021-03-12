import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDto } from 'src/app/models/carDto';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
  providers: [CarService]
})
export class CarDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private carService: CarService) { }

  carDto?: CarDto;
  imageUrl = environment.apiURL;
  dataLoaded = false;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
        this.getCarDtoByID(params['carID']);
        this.dataLoaded = true;
      })
  }


  getCarDtoByID(carID: string): void {
    this.carService.getCarDtoByID(carID).subscribe((response?) => {
      this.carDto = response.data
    })
  }
}
