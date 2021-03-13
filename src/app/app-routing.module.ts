import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { CarDetailComponent } from './components/car/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'cars', component: CarComponent },
  { path: 'carDetail/:carID', component: CarDetailComponent },
  { path: 'rentals', component: RentalComponent },
  { path: 'users', component: UserComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'colors', component: ColorComponent },
  { path: 'brands', component: BrandComponent },
  { path: '', redirectTo: '', pathMatch: 'full', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
