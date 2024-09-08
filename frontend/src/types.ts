export type User = {
  _id: string;
  email: string;
  name: string;
  city: string;
  country: string;
  addressLine1: string;
};

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: string;
  estimatedDeliveryTime: string;
  cuisines: string[];
  menuItems: MenuItem[];
  imageURL: string;
  lastUpdated: string;
};
export type MenuItem = {
  _id: string;
  name: string;
  price: string;
};

export type RestaurantSearchResponse = {
  data: Restaurant[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type Order = {
  _id: string;
  restaurant: Restaurant;
  user: User;
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    name: string;
    addressLine1: string;
    city: string;
    email: string;
  };
  totalAmount: string;
  status: OrderStatus;
  createdAt: string;
  restaurantId: string;
};

export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";
