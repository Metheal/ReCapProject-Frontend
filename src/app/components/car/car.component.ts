import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarDto } from 'src/app/models/carDto';
import { UserClaims } from 'src/app/models/userClaims';
import { JwtService } from 'src/app/services/jwt.service';
import { environment } from 'src/environments/environment';
import { CarService } from '../../services/car.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
  providers: [CarService],
})
export class CarComponent implements OnInit {
  brandFilterText = '';
  colorFilterText = '';
  carFilterText = '';
  carsDto: CarDto[];
  colorNames: string[] = [];
  brandNames: string[] = [];
  carFilterForm: FormGroup = new FormGroup({});
  title = 'Araclar';
  message: string;
  success: boolean;
  dataLoaded = false;
  imageUrl: string = environment.apiURL;

  user: UserClaims;
  faEdit = faEdit;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private jwt: JwtService,
    private auth: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['colorName']) {
        this.getCarDetailsByColorName(params['colorName']);
      } else if (params['brandName']) {
        this.getCarDetailsByBrandName(params['brandName']);
      } else {
        this.getCarDetails();
      }
    });
    this.createCarFilterForm();
    this.user = this.jwt.getLoggedUser();
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

  getColorNames($event: string[]): void {
    this.colorNames = $event;
  }

  getBrandNames($event: string[]): void {
    this.brandNames = $event;
  }

  createCarFilterForm(): void {
    this.carFilterForm = this.formBuilder.group({
      carFilterText: this.carFilterText,
      brandFilterText: this.brandFilterText,
      colorFilterText: this.colorFilterText,
    });
  }

  applyFilter(): void {
    this.carFilterText = this.carFilterForm.value.carFilterText;
    this.colorFilterText = this.carFilterForm.value.colorFilterText;
    this.brandFilterText = this.carFilterForm.value.brandFilterText;
  }

  isLoggedIn(): boolean {
    var result = this.auth.isAuthenticated();
    if (result) {
      this.user = this.jwt.getLoggedUser();
    }
    return result;
  }
}
