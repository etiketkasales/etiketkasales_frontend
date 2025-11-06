export interface IUserAddressBase {
  name: string; //Дом
  full_name: string; // ФИО
  phone: string;
  country: string;
  region: string;
  city: string;
  street: string;
  house: string;
  apartment: string;
  entrance: string;
  floor: string;
  postal_code: string;
  comment: string;
}

export interface IUserAddress extends IUserAddressBase {
  id: number;
  user_id: number;
  is_default: boolean;
  is_active: boolean;
  created_at: string; //2025-01-07T12:00:00+00:00
  updated_at: string; //2025-01-07T12:00:00+00:00
}
