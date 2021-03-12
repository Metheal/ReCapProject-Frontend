import { RentalDto } from './rentalDto';
import { ResponseModel } from './responseModel';

export interface RentalsDtoResponseModel extends ResponseModel {
  data: RentalDto[];
}
