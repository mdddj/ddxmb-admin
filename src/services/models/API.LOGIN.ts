// To parse this data:
//
//   import { Convert, APILoginData } from "./file";
//
//   const aPILoginData = Convert.toAPILoginData(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export type APILoginData = {
  state: number;
  message: string;
  data: User;
};

export interface User {
  id: number;
  loginNumber: string;
  nickName: string;
  email: string | null;
  picture: string;
  phone: String | null;
  password: string;
  loginTime: null;
  type: number;
  roles: Role[];
  resourcesCategories: any[];
  status: number;
  salt: string;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  createDate: number;
  status: number;
  roleSort: number;
}
