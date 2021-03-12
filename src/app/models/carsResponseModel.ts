import { Car } from "./car";
import { ResponseModel } from "./responseModel";

export interface CarsResponseModel extends ResponseModel {
  data: Car[];
}