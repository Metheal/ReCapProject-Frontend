import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Brand } from '../../models/brand';
import { BrandService } from '../../services/brand.service';
import { faEdit, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { UserClaims } from 'src/app/models/userClaims';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
  providers: [BrandService],
})
export class BrandComponent implements OnInit {
  @Input() user: UserClaims;
  @Output() brandNames = new EventEmitter<string[]>();
  title = 'Tum Markalar';
  brands: Brand[];
  message: string;
  success: boolean;
  dataLoaded = false;
  faEdit = faEdit;
  faPlusSquare = faPlusSquare;

  constructor(private brandService: BrandService, private auth: AuthService) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(): void {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.success = response.success;
      this.message = response.message;
      this.dataLoaded = true;
      this.sendBrandNames();
    });
  }

  sendBrandNames(): void {
    let brandNames: string[] = [];
    this.brands.forEach((element) => brandNames.push(element.brandName));
    this.brandNames.emit(brandNames);
  }

  isLoggedIn(): boolean {
    var result = this.auth.isAuthenticated();
    return result;
  }
}
