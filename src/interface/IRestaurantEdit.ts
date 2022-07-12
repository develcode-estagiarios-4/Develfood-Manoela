export interface IRestaurantUpdate {
  photo: { code: string };
  user: { id: number };
  id: number;
  name: string;
  cnpj: string;
  phone: string;
  address: {
    id: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    zipCode: string;
    state: string;
    nickname: string;
  };
  foodTypes: [
    {
      id: number;
      name: string;
    }
  ];
}
