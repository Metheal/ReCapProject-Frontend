import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [CustomerService],
})
export class CustomerComponent implements OnInit {
  constructor(private customerService: CustomerService) {}

  title = 'Musteriler';
  customers: Customer[];
  message: string;
  success: boolean;
  dataLoaded = false;

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
      this.message = response.message;
      this.success = response.success;
      this.dataLoaded = true;
    })
  }
}
