import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Color } from '../../models/color';
import { ColorService } from '../../services/color.service';
import { faEdit, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { UserClaims } from 'src/app/models/userClaims';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
  providers: [ColorService],
})
export class ColorComponent implements OnInit {
  constructor(private colorService: ColorService, private auth: AuthService) {}

  @Input() user: UserClaims;
  title = 'Tum Renkler';
  colors: Color[];
  success: boolean;
  message: string;
  dataLoaded = false;
  faEdit = faEdit;
  faPlusSquare = faPlusSquare;
  @Output() colorNames = new EventEmitter<string[]>();

  ngOnInit(): void {
    this.getColor();
  }

  getColor(): void {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.success = response.success;
      this.message = response.message;
      this.dataLoaded = true;
      this.sendColorNames();
    });
  }

  sendColorNames(): void {
    let colorNames: string[] = [];
    this.colors.forEach((color) => colorNames.push(color.colorName));
    this.colorNames.emit(colorNames);
  }

  isLoggedIn(): boolean {
    var result = this.auth.isAuthenticated();
    return result;
  }
}
