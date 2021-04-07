import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  @Input() totalAmount: number;
  @Input() days: number;
  @Input() carName: string;
  @Output('onSuccess') onSuccess: EventEmitter<any> = new EventEmitter();

  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();
  paymentAddForm: FormGroup;
  saveCreditCard: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private creditCardService: CreditCardService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createPaymentForm();
  }

  createPaymentForm() {
    this.paymentAddForm = this.formBuilder.group({
      creditCardNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{16}$/)],
      ],
      cardHolderName: ['', [Validators.required, Validators.maxLength(50)]],
      expirationMonth: [
        '',
        [Validators.required, Validators.min(1), Validators.max(12)],
      ],
      expirationYear: [
        '',
        [
          Validators.required,
          Validators.min(this.currentYear),
          Validators.max(this.currentYear + 15),
        ],
      ],
      creditCardCVV: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{3}$/)],
      ],
    });
  }

  checkCreditCard() {
    if (this.paymentAddForm.valid) {
      let creditCardModel = Object.assign({}, this.paymentAddForm.value);
      creditCardModel.customerID = 3;
      this.creditCardService
        .add(creditCardModel, this.saveCreditCard)
        .subscribe((response) => {
          //this.toastrService.success('Kredi Karti Tanimlamasi Basarili');
          this.onSuccess.emit();
        });
    }
  }
}
