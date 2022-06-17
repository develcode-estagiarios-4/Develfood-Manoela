export interface INewPromotion {
  name: string;
  percent: string;
  photo: {
    code: string;
  };
  dateInitial: string;
  dateFinal: string;
  restaurant: { id: number };
}
