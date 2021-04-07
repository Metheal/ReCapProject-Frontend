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
  @Output() brandNames = new EventEmitter<string[]>();
  constructor(private brandService: BrandService) {}
  title = 'Tum Markalar';
  // propName = 'brandName';
  // allBrands = true;
  brands: Brand[];
  message: string;
  success: boolean;
  dataLoaded = false;
  // currentFilter: string;
  // @Input() params: string;
  // @Output() setParams = new EventEmitter<string>();

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(): void {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.success = response.success;
      this.message = response.message;
      this.dataLoaded = true;
      this.sentBrandNames();
    });
  }

  // addBrandNameToParams(brandName: string): void {
  //   if (this.currentFilter) {
  //     this.params.replace(this.currentFilter, brandName);
  //     this.currentFilter = brandName;
  //   } else {
  //     this.params += "?" + this.propName + '=' + brandName;
  //     this.currentFilter = brandName;
  //   }
  //   this.setParams.emit(this.propName + '=' + brandName)
  //   this.allBrands = false;
  // }

  // resetParams(): void {
  //   if (this.currentFilter){
  //     this.params = '';
  //     this.setParams.emit(this.propName + '=' );
  //   }
  //   this.allBrands = true;
  // }

  sentBrandNames(): void {
    let brandNames: string[] = [];
    this.brands.forEach((element) => brandNames.push(element.brandName));
    this.brandNames.emit(brandNames);
  }
}
