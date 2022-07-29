export interface IEvaluation {
  id: number;
  grade: number;
  evaluationDate: string;
  observation: string;
  restaurant: number;
  costumer: {
    id: number;
    firstName: string;
    lastName: string;
    address: [
      {
        id: number;
        street: string;
        number: string;
        neighborhood: string;
        city: string;
        zipCode: string;
        state: string;
        nickname: string;
      }
    ];
    photo_url: string;
  };
}
