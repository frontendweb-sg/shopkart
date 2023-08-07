export interface IOrderDetail {
  order_id: string;
  product_id: string;
  order_number: number;
  price: number;
  quanity: number;
  discount: number;
  total: number;
  size: string;
  color: string;
  status: string; // []
}
