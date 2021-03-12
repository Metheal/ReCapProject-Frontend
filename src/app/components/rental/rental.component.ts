import { Component, OnInit } from '@angular/core';
import { RentalDto } from 'src/app/models/rentalDto';
import { Rental } from '../../models/rental';
import { RentalService } from '../../services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
  providers: [RentalService],
})
export class RentalComponent implements OnInit {
  constructor(private rentalService: RentalService) {}

  title = 'Kiralamalar';
  rentals?: Rental[];
  rentalsDto?: RentalDto[];
  message?: string;
  succss?: boolean;
  dataLoaded = false;

  ngOnInit(): void {
    this.getRentalDetails();
  }

  getRentals(): void {
    this.rentalService.getRentals().subscribe((response) => {
      this.rentals = response.data;
      this.message = response.message;
      this.succss = response.success;
      this.dataLoaded = true;
    })
  }

  getRentalDetails(): void {
    this.rentalService.getRentalDetails().subscribe((response) => {
      this.rentalsDto = response.data;
      this.message = response.message;
      this.succss = response.success;
      this.dataLoaded = true;
    })
  }
}
