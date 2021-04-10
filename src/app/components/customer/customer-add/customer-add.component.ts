import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css'],
})
export class CustomerAddComponent implements OnInit {
  @Input() userID: number;
  customer: Customer;
  customerAddForm: FormGroup;

  constructor(
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.createCustomerAddForm();
  }

  createCustomerAddForm(): void {
    this.customerAddForm = this.formBuilder.group({
      userID: [this.userID],
      companyName: ['', Validators.required],
    });
  }

  addCustomer(): void {
    if (this.customerAddForm.valid) {
      const customerModel = Object.assign({}, this.customerAddForm.value);
      this.customerService.add(customerModel).subscribe(
        (response) => {
          this.toastrService.success('Musteri kaydedildi');
        },
        (responseError) => {
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }
}
