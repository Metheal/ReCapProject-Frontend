import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [CustomerService],
})
export class CustomerComponent implements OnInit {
  constructor(
    private customerService: CustomerService,
    private toastrService: ToastrService
  ) {}

  title = 'Musteriler';
  customers: Customer[];
  message: string;
  success: boolean;
  dataLoaded = false;
  customerToDelete: Customer;

  faEdit = faEdit;
  faTrash = faTrash;

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getAll().subscribe((response) => {
      this.customers = response.data;
      this.message = response.message;
      this.success = response.success;
      this.dataLoaded = true;
    });
  }
  deleteCustomer() {
    this.customerService.delete(this.customerToDelete).subscribe(() => {
      this.toastrService.success('Musteri bilgileri silindi');
      document.getElementById('deleteCustomerModal').click();
      this.customerToDelete = void 0;
    });
  }

  setCustomerToDelete(customer: Customer): void {
    this.customerToDelete = customer;
  }
}
