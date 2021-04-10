import { Component, Input, OnInit } from '@angular/core';
import { CarDto } from 'src/app/models/carDto';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.css'],
})
export class RentalDetailComponent implements OnInit {
  @Input() customerID: number;
  rentals: Rental[];
  cars: CarDto[] = [];
  car: CarDto
  baseUrl: string = environment.apiURL;

  constructor(
    private rentalService: RentalService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.getAllByCustomerID();
  }

  getAllByCustomerID(): void {
    this.rentalService
      .getAllByCustomerID(this.customerID)
      .subscribe((response) => {
        this.rentals = response.data;
        this.getCarDetails();
      });
  }

  getCarDetails(): void {
    this.rentals.forEach((rental) => {
      this.carService.getCarDtoByID(rental.carID).subscribe((response) => {
        const car = response.data;
        this.cars.push(car);
      });
    });
  }
}
