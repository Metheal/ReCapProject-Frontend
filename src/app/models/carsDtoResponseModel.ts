import { CarDto } from "./carDto";
import { ResponseModel } from "./responseModel";

export interface CarsDtoResponseModel extends ResponseModel {
  data: CarDto[];
}