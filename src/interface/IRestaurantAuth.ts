export interface IRestaurantAuth {
  id: number;
  email: string;
  password: string;
  creationDate: string;
  role: {
    id: number;
    name: string;
    authority: string;
  };
  costumer: string;
  restaurant: {
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
  };
}
