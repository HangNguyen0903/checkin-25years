export interface Seat {
  uuid: string;
  name: string;
  image?: string;
  event: {
    id: string;
    name: string;
  };
}
