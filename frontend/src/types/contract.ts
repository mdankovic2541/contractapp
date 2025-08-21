export interface Contract {
  id: number;
  client_id: number;
  client_name?: string;
  title: string;
  start_date: string;
  duration_months: number;
  comments?: string;
}
