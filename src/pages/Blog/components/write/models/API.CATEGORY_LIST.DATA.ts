// To parse this data:
//
//   import { Convert, APICategoryListData } from "./file";
//
//   const aPICategoryListData = Convert.toAPICategoryListData(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface APICategoryListData {
  state:   number;
  message: string;
  data:    Datum[];
}

export interface Datum {
  id:         number;
  name:       string;
  logo:       string;
  intro:      string;
  createTime: number;
}

