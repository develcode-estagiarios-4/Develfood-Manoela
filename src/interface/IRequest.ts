export interface IRequest {
  id: number;
  costumer: {
    id: number;
    firstName: string;
    lastName: string;
    address: [];
    photo_url: string;
  };
  restaurant: null;
  date: string;
  dateLastUpdated: string;
  totalValue: number;
  paymentType: string;
  status: string;
  requestItems: [
    {
      id: number;
      plateDTO: {
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
      };
      quantity: number;
      price: number;
      observation: string;
    }
  ];
}
