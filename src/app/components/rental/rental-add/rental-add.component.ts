import { Component, Input, OnInit } from '@angular/core';
import { RentalService } from 'src/app/services/rental.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Rental } from 'src/app/models/rental';
import { CarDto } from 'src/app/models/carDto';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { PaymentService } from 'src/app/services/payment.service';
import { Payment } from 'src/app/models/payment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
  providers: [RentalService],
})
export class RentalAddComponent implements OnInit {
  rental: Rental;
  rentalAddForm: FormGroup;
  @Input() car: CarDto;
  @Input() customer: Customer;
  currentDate = new Date();
  nextDate: Date;
  totalAmount: number;
  days: number;
  carAvailable: boolean;
  checked: number = 0;
  paymentModel: Payment = {} as Payment;
  // availableAfter: Date; // maybe later

  constructor(
    private rentalService: RentalService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createRentalForm();
  }

  createRentalForm(): void {
    this.rentalAddForm = this.formBuilder.group({
      carID: [this.car.carID, Validators.required],
      customerID: [this.customer.customerID, Validators.required],
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
    });
  }

  add(): void {
    if (this.rentalAddForm.valid && this.checked < 2) {
      this.checkAvailability(); // if someone makes a change on form, making sure no flaws to be left :)
      let rentalModel = Object.assign({}, this.rentalAddForm.value);
      this.rentalService.add(rentalModel).subscribe(
        (response) => {
          //this.toastrService.success('Kiralama Basarili');
          this.pay(+response.message);
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Dogrulama hatasi'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formu gozden gecirin', 'Basarisiz');
    }
  }

  checkAvailability(): void {
    if (this.checked === 2) {
      return;
    }
    if (this.rentalAddForm.valid && this.checkFindexScore) {
      const rentDate = +new Date(this.rentalAddForm.value.rentDate);
      const returnDate = +new Date(this.rentalAddForm.value.returnDate);
      this.days = (returnDate - rentDate) / 1000 / 3600 / 24;
      this.totalAmount = Math.ceil(this.days) * this.car.dailyPrice;

      this.rentalService
        .getSingleByCarID(
          this.car.carID,
          this.rentalAddForm.value.rentDate,
          this.rentalAddForm.value.returnDate
        )
        .subscribe(
          (response) => {
            if (response === false) {
              this.carAvailable = true;
              this.checked++;
            } else {
              this.carAvailable = false;
              this.checked++;
            }
          },
          (responseError) => {
            if (responseError.error.Errors.length > 0) {
              for (let i = 0; i < responseError.error.Errors.length; i++) {
                this.toastrService.error(
                  responseError.error.Errors[i].ErrorMessage,
                  'Dogrulama hatasi'
                );
              }
            }
          }
        );
    } else {
      this.toastrService.error('Formu gozden gecirin', 'Basarisiz');
    }
  }

  onSuccess(): void {
    this.add();
  }

  onError(): void {
    this.toastrService.error('Odeme basarisiz');
  }

  changeDate(): void {
    this.nextDate = new Date(this.rentalAddForm.value.rentDate);
    this.nextDate.setDate(this.nextDate.getDate() + 1);
  }

  reset(): void {
    this.checked = 0;
    this.carAvailable = void 0;
  }

  pay(id: number) {
    this.paymentModel.rentalID = id;
    this.paymentModel.paidAmount = this.totalAmount;
    this.paymentService.addPayment(this.paymentModel).subscribe(
      (response) => {
        this.toastrService.success('Arac kiralandi', 'Odeme Basarili');
        document.getElementById('paymentModal').click();
        //this.reset()
      },
      (responseError) => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(
              responseError.error.Errors[i].ErrorMessage,
              'Dogrulama hatasi'
            );
          }
        }
      }
    );
  }

  checkFindexScore() {
    if (this.car && this.customer) {
      const result =
        this.customer.findexScore >= this.car.findexScore ? true : false;
      return result;
    }
    return false;
  }
}
