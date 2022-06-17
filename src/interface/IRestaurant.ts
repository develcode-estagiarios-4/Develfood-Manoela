export interface IRestaurant {
  food_types: [
    {
      id: number;
      name: string;
    }
  ];
  id: number;
  name: string;
  photo_url: string;
}
