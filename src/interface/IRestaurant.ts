export interface IRestaurant {
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
  food_types: [
    {
      id: number;
      name: string;
    }
  ];
}
