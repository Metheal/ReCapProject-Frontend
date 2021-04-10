import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  user: User;
  updateUserForm: FormGroup;
  customerID: number;

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getUser(params['userID']);
    });
  }

  createUpdateUserForm(): void {
    this.updateUserForm = this.formBuilder.group({
      userID: [this.user.userID],
      eMail: [this.user.eMail, [Validators.required, Validators.email]],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      passwordHash: [this.user.passwordHash],
      passwordSalt: [this.user.passwordSalt],
    });
  }

  updateUser(): void {
    if (this.updateUserForm.valid) {
      const userModel: User = Object.assign(this.updateUserForm.value);
      this.userService.updateUser(userModel).subscribe(
        (response) => {
          this.toastrService.success('Kullanici guncellendi');
        },
        (responseError) => {
          this.toastrService.error('Hata');
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }

  getUser(userID: number): void {
    this.userService.getUserByID(userID).subscribe((response) => {
      this.user = response.data;
      this.createUpdateUserForm();
    });
  }

  getCustomerID($event: number): void {
    this.customerID = $event;
  }
}
