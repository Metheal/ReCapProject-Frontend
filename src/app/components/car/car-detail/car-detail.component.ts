import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDto } from 'src/app/models/carDto';
import { Customer } from 'src/app/models/customer';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { JwtService } from 'src/app/services/jwt.service';
import { environment } from 'src/environments/environment';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { UserClaims } from 'src/app/models/userClaims';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
  providers: [CarService],
})
export class CarDetailComponent implements OnInit {
  car: CarDto;
  customer: Customer;
  user: UserClaims;
  imageUrl = environment.apiURL;
  dataLoaded = false;
  faEdit = faEdit;

  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private jwt: JwtService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.getCustomerByUserID();
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

  getCustomerByUserID(): void {
    this.user = this.jwt.getLoggedUser();
    if (this.user)
      this.customerService.getByUserID(this.user.nameidentifier).subscribe(
        (response) => {
          this.customer = response.data;
        },
        (responseError) => {}
      );
  }
}
