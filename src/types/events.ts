export interface Event {
  id?: string;
  name: string;
  description: string;
}

export interface EventsParams {
  page?: number;
  limit?: number;
  orderBy?: string;
  order?: "asc" | "desc";
  name?: string;
}
