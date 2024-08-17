export interface Reservation {
  restaurant?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhoneNumber?: string;
  slotInterval?: string;
  reservedDate?: string;
  // new
  userName: string
  tableNumber: number,
  totalPersons: number,
  date: string,
  time: string,
  _id?: string;
}

