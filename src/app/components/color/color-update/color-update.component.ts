import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css'],
})
export class ColorUpdateComponent implements OnInit {
  color: Color;

  colorUpdateForm: FormGroup;
  constructor(
    private colorService: ColorService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getColor(params['colorID']);
    });
  }

  createColorUpdateForm(): void {
    this.colorUpdateForm = this.formBuilder.group({
      colorID: [this.color.colorID],
      colorName: [this.color.colorName, Validators.required],
    });
  }

  update() {
    if (this.colorUpdateForm.valid) {
      const colorModel = Object.assign({}, this.colorUpdateForm.value);
      this.colorService.updateColor(colorModel).subscribe(
        (response) => {
          this.toastrService.success('Marka Guncellendi', 'Basarili');
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

  getColor(id: number) {
    this.colorService.getColor(id).subscribe((response) => {
      this.color = response.data;
      this.createColorUpdateForm();
    });
  }
}
