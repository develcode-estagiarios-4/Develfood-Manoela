/* eslint-disable prettier/prettier */
export interface IPlate {
  id: number;
  name: string;
  description: string;
  price: number;
  foodType: {
    id: number;
    name: string;
  };
  restaurantName: string;
  photo_url: string;
}
