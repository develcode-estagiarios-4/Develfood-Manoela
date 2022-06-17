export interface IBodyContext {
  email: string;
  password: string;
  creationDate: string;
  role: {
    id: number;
  };
  restaurant: {
    name: string;
    cnpj: string;
    phone: string;
    photo: {
      code: string;
    };
    foodTypes: ("" | { id: number })[];
    address: {
      street: string;
      number: string;
      neighborhood: string;
      city: string;
      zipCode: string;
      state: string;
      nickname: string;
    };
  };
}
