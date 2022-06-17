/* eslint-disable prettier/prettier */
export interface INewPlate {
  name: string;
  description: string;
  price: number;
  foodType: { id: number };
  restaurant: { id: number };
  photo: { code: string };
}
