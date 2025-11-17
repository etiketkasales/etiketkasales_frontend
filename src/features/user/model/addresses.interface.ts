export interface IUserAddressBase {
  name: string; //Дом
  full_name: string; // ФИО
  phone: string;
  country: string | null;
  region: string | null;
  city: string | null;
  street: string | null;
  house: string | null;
  apartment: string | null;
  entrance: string | null;
  floor: string | null;
  postal_code: string | null;
  comment: string | null;
}

export interface IUserAddress extends IUserAddressBase {
  id: number;
  user_id: number;
  is_default: boolean;
  is_active: boolean;
  created_at: string; //2025-01-07T12:00:00+00:00
  updated_at: string; //2025-01-07T12:00:00+00:00
}

export interface ISuggestedAddress {
  id: number;
  full_address: string;
  city: string | null;
  street: string | null;
  house: string | null;
  entrance: string | null;
  floor: string | null;
  apartment: string | null;
  postal_code: string | null;
}
