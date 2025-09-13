// export interface User {
//   id: number;
//   username: string;
//   email: string;
// }

export interface Product {
  id: number;
  name: string;
  sku?: string;
  price: number;
  qty: number;
  image_url?: string;
  description?: string;
}

// src/types/index.ts
export type User = {
  email: string;
};
