// To parse this data:
//
//   import { Convert, BlogAllData } from "./file";
//
//   const blogAllData = Convert.toBlogAllData(json);

export interface BlogAllData {
  state: number;
  message: string;
  data: DataMap;
}

interface DataMap {
  list: BlogObject[];
  page: Page;
}

export interface Page {
  currentPage: number;
  hasPrevious: boolean;
  maxPage: number;
  pageSize: number;
  paged: boolean;
  total: number;
}

export interface BlogObject {
  id: number;
  title: string;
  content: string;
  createTime: number;
  category: Category;
  author: string;
  thumbnail?: string;
}

export interface Category {
  id: number;
  name: string;
  logo: string;
  intro: string;
  createTime: number;
}
//
// // Converts JSON strings to/from your types
// export class Convert {
//   public static toBlogAllData(json: string): BlogAllData {
//     return JSON.parse(json);
//   }
//
//   public static blogAllDataToJson(value: BlogAllData): string {
//     return JSON.stringify(value);
//   }
// }
