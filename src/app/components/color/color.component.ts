import { Component, OnInit } from '@angular/core';
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
  colors?: Color[];
  success?: boolean;
  message?: string;
  dataLoaded = false;
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
}
