type Customer = {
  email: string;
  name: string;
};

type CustomerList = {
  name: IDBCursor;
  value: Customer;
};

type TrackingItem = {
  customer_id: ID;
  customer: Customer;
  items: Item[];
};

type Item = {
  item_id: ID;
  name: string;
  price: number;
  quantity: number;
};

type OrderResponse = {
  value: Order;
};

type Order = {
  carrier: string;
  createdAt: Date;
  shippingCost: number;
  trackingId: string;
  Address: string;
  City: string;
  Lat: number;
  Lng: number;
  trackingItems: TrackingItems;
};
