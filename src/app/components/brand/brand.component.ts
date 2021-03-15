import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Brand } from '../../models/brand';
import { BrandService } from '../../services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
  providers: [BrandService],
})
export class BrandComponent implements OnInit {
  constructor(private brandService: BrandService) {}
  title = 'Tum Markalar';
  propName = 'brandName';
  brands: Brand[];
  message: string;
  success: boolean;
  dataLoaded = false;
  currentFilter: string;
  @Input() params: string;
  @Output() setParams = new EventEmitter<string>();

  ngOnInit(): void {
    this.getBrands();
    console.log(this.params);
  }

  getBrands(): void {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.success = response.success;
      this.message = response.message;
      this.dataLoaded = true;
    });
  }

  addBrandNameToParams(brandName: string): void {
    if (this.currentFilter) {
      this.params.replace(this.currentFilter, brandName);
      this.currentFilter = brandName;
    } else {
      this.params += "?" + this.propName + '=' + brandName;
      this.currentFilter = brandName;
    }
    this.setParams.emit(this.propName + '=' + brandName)
  }

  resetParams(): void {
    if (this.currentFilter){
      this.params = '';
      this.setParams.emit('');
    }
  }
}
