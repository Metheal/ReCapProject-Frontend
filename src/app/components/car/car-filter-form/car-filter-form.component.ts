import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-car-filter-form',
  templateUrl: './car-filter-form.component.html',
  styleUrls: ['./car-filter-form.component.css'],
})
export class CarFilterFormComponent implements OnInit {
  carFilterForm: FormGroup = new FormGroup({});
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createCarFilterForm();
  }

  createCarFilterForm(): void {
    this.carFilterForm = this.formBuilder.group({
      carName: [''],
      brandName: [''],
      colorName: [''],
    });
  }
}
