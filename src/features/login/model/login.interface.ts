interface ICodeBase {
  success: boolean;
  message: string;
}

export interface ISendCode extends ICodeBase {
  expires_in?: number;
}

interface IUser {
  id: number;
  phone: string;
  email: string | null;
  name: string | null;
  surname: string | null;
  role: string;
  is_active: boolean;
  created_at: string;
}
export interface IVerifyCode extends ICodeBase {
  token: string;
  user: IUser;
}
