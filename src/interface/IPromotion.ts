export interface IPromotion {
  dateFinal: string;
  dateInitial: string;
  id: number;
  name: string;
  percent: number;
  photo_url: string;
  restaurant: {
    id: number;
    name: string;
    photo_url: string;
  };
}
