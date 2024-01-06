type JWTPayloadInterface = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  address?: UserAddress;
  businessName?: string;
  type: string;
  isEmailVerified: string;
  accountStatus: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type UserAddress<T = string> = {
  _id?: T;
  country: string;
  state: string;
  city: string;
  street: string;
  postalCode: string;
  isActive: boolean;
};
