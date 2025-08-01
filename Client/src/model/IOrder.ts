export interface Order {
  id: number;
  orderDate: Date;
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  adressLine: string;
  customerId: string;
  orderStatus: number;
  orderItems: OrderItem[];
  subTotal: number;
  deliveryFee: number;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
}
