import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';
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
  @Input() customerID: number;
  @Output('onSuccess') onSuccess: EventEmitter<any> = new EventEmitter();
  @Output('onError') onError: EventEmitter<any> = new EventEmitter();

  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();
  paymentAddForm: FormGroup;
  saveCreditCard: boolean = true;

  creditCards: CreditCard[] = [];
  currentCreditCard: CreditCard;

  constructor(
    private formBuilder: FormBuilder,
    private creditCardService: CreditCardService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createPaymentForm();
    this.getAllCreditCards();
  }

  createPaymentForm() {
    this.paymentAddForm = this.formBuilder.group({
      customerID: [this.customerID],
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
        [Validators.required, Validators.min(111), Validators.max(999)],
      ],
    });
  }

  checkCreditCard() {
    if (this.paymentAddForm.valid) {
      let creditCardModel = Object.assign({}, this.paymentAddForm.value);
      this.creditCardService
        .add(creditCardModel, this.saveCreditCard)
        .subscribe(
          () => {
            //this.toastrService.success('Kredi Karti Tanimlamasi Basarili');
            this.onSuccess.emit();
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
  }

  getAllCreditCards(): void {
    this.creditCardService
      .getCreditCardsByCustomerID(this.customerID)
      .subscribe((response) => {
        this.creditCards = response.data;
      });
  }

  setCurrentCreditCard(creditCard: CreditCard) {
    this.paymentAddForm
      .get('creditCardNumber')
      .setValue(creditCard.creditCardNumber);
    this.paymentAddForm
      .get('cardHolderName')
      .setValue(creditCard.cardHolderName);
    this.paymentAddForm
      .get('expirationMonth')
      .setValue(creditCard.expirationMonth);
    this.paymentAddForm
      .get('expirationYear')
      .setValue(creditCard.expirationYear);
    this.paymentAddForm.get('creditCardCVV').setValue(creditCard.creditCardCVV);
    this.saveCreditCard = false;
  }
}
