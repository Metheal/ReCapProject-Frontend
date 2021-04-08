import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { CarDetailComponent } from './components/car/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update.component';
import { ColorUpdateComponent } from './components/color/color-update/color-update.component';

const routes: Routes = [
  { path: 'cars', component: CarComponent },
  { path: 'cars/color/:colorName', component: CarComponent },
  { path: 'cars/brand/:brandName', component: CarComponent },
  { path: 'carDetail/:carID', component: CarDetailComponent },
  { path: 'carAdd', component: CarAddComponent },
  { path: 'carUpdate/:carID', component: CarUpdateComponent },
  { path: 'rentals', component: RentalComponent },
  { path: 'rent/:carID', component: RentalAddComponent },
  { path: 'users', component: UserComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'colors', component: ColorComponent },
  { path: 'colorUpdate/:colorID', component: ColorUpdateComponent },
  { path: 'colorAdd', component: ColorAddComponent },
  { path: 'brands', component: BrandComponent },
  { path: 'brandUpdate/:brandID', component: BrandUpdateComponent },
  { path: 'brandAdd', component: BrandAddComponent },
  { path: '', redirectTo: '', pathMatch: 'full', component: CarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
