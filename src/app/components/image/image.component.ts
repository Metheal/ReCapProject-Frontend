import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { ImageService } from 'src/app/services/image.service';
import { environment } from 'src/environments/environment';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent implements OnInit {
  @Input() car: Car;
  carImages: CarImage[];
  baseUrl = environment.apiURL;
  imageDataToUpload: any;
  imageToDelete: CarImage;
  carImageAddForm: FormGroup;
  faTimes = faTimes;
  faTrash = faTrash;

  constructor(
    private imageService: ImageService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getImagesByCarID();
    this.createImageAddForm();
  }

  createImageAddForm(): void {
    this.carImageAddForm = this.formBuilder.group({
      image: ['', Validators.required],
    });
  }

  getImagesByCarID(): void {
    this.imageService.getImagesByCarID(this.car.carID).subscribe((response) => {
      this.carImages = response.data;
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file.size > 10 * Math.pow(1024, 2)) {
      this.toastrService.error(
        `Sectiginiz dosya 10MB'tan daha buyuk olamaz: ${(
          Math.round((file.size / Math.pow(1024, 2)) * 100) / 100
        ).toFixed(2)}MB`,
        'Hata'
      );
    } else {
      this.imageDataToUpload = file;
    }
  }

  uploadImage(): void {
    if (this.carImageAddForm.valid) {
      const formData: FormData = new FormData();
      formData.append('image', this.imageDataToUpload);
      formData.append('carID', this.car.carID.toString());
      this.imageService.addImage(formData).subscribe(
        (response) => {
          this.toastrService.success('Gorsel eklendi', 'Basarili');
          this.reload();
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }

  deleteImage(image: CarImage): void {
    this.imageService.deleteImage(image).subscribe(() => {
      this.toastrService.success('Gorsel silindi', 'Basarili');
      document.getElementById('deleteImage').click();
      this.imageToDelete = void 0;
      this.reload();
    });
  }

  setImageToDelete(image: CarImage): void {
    this.imageToDelete = image;
  }

  reload() {
    this.router
      .navigateByUrl('', {
        skipLocationChange: true,
      })
      .then(() => {
        this.router.navigate(['/carUpdate/' + this.car.carID]);
      });
  }
}
