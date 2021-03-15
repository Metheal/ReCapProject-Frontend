import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Color } from '../../models/color';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
  providers: [ColorService],
})
export class ColorComponent implements OnInit {
  constructor(private colorService: ColorService) {}

  title = 'Tum Renkler';
  propName = 'colorName';
  allColors = true;
  colors?: Color[];
  success?: boolean;
  message?: string;
  dataLoaded = false;
  currentFilter: string;
  @Input() params: string;
  @Output() setParams = new EventEmitter<string>();

  ngOnInit(): void {
    this.getColor();
  }

  getColor(): void {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.success = response.success;
      this.message = response.message;
      this.dataLoaded = true;
    });
  }
  
  addColorNameToParams(colorName: string): void {
    if (this.currentFilter) {
      this.params.replace(this.currentFilter, colorName);
      this.currentFilter = colorName;
    } else {
      this.params += '?' + this.propName + '=' + colorName;
      this.currentFilter = colorName;
    }
    this.setParams.emit(this.propName + '=' + colorName);
    this.allColors = false;
  }

  resetParams(): void {
    if (this.currentFilter) {
      this.params = '';
      this.setParams.emit(this.propName + '=');
    }
    this.allColors = true;
  }
}
