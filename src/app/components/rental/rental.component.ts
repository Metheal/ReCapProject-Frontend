import { Component, OnInit } from '@angular/core';
import { RentalDto } from 'src/app/models/rentalDto';
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
  rentalsDto: RentalDto[];
  message: string;
  success: boolean;
  dataLoaded = false;

  ngOnInit(): void {
    this.getRentalDetails();
  }

  getRentalDetails(): void {
    this.rentalService.getRentalDetails().subscribe((response) => {
      this.rentalsDto = response.data;
      this.message = response.message;
      this.success = response.success;
      this.dataLoaded = true;
    });
  }
}
